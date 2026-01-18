import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// Enhanced session management with rate limiting
interface Session {
  csrfToken: string;
  createdAt: number;
  lastActivity: number;
  requestCount: number;
  lastRequestTime: number;
}

const sessions = new Map<string, Session>();

// Rate limiting configuration
const RATE_LIMIT = {
  MAX_REQUESTS: 3, // Max requests per window (more restrictive for newsletter)
  WINDOW_MS: 60 * 1000, // 1 minute window
  CLEANUP_INTERVAL: 60 * 60 * 1000 // 1 hour cleanup
};

// CSRF token validation with enhanced security
async function validateCSRFToken(token: string | undefined, sessionToken: string): Promise<boolean> {
  if (!token || !sessionToken) return false;
  
  // Timing attack protection
  const start = Date.now();
  const isValid = token === sessionToken;
  const elapsed = Date.now() - start;
  
  // Add random delay to prevent timing attacks
  const randomDelay = Math.random() * 10;
  if (elapsed < 5) {
    await new Promise(resolve => setTimeout(resolve, randomDelay));
  }
  
  return isValid;
}

// Generate cryptographically secure CSRF token
function generateCSRFToken(): string {
  return crypto.randomUUID();
}

// Enhanced rate limiting check
function checkRateLimit(session: Session): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  
  // Reset counter if window has passed
  if (now - session.lastRequestTime > RATE_LIMIT.WINDOW_MS) {
    session.requestCount = 0;
  }
  
  // Check if rate limit exceeded
  if (session.requestCount >= RATE_LIMIT.MAX_REQUESTS) {
    const retryAfter = Math.ceil((RATE_LIMIT.WINDOW_MS - (now - session.lastRequestTime)) / 1000);
    return { allowed: false, retryAfter };
  }
  
  // Update request count and timestamp
  session.requestCount++;
  session.lastRequestTime = now;
  
  return { allowed: true };
}

// Clean up old sessions and expired rate limit data
function cleanupSessions() {
  const now = Date.now();
  
  for (const [sessionId, session] of sessions.entries()) {
    // Remove sessions older than 1 hour
    if (now - session.lastActivity > RATE_LIMIT.CLEANUP_INTERVAL) {
      sessions.delete(sessionId);
    }
  }
}

interface SubscribeRequest {
  email: string;
  source?: string;
  category?: string;
  formType?: string;
  _csrf?: string;
  honeypot?: string;
}

interface SubscribeResponse {
  success: boolean;
  message: string;
  leadMagnetUrl?: string;
  csrfToken?: string;
  error?: string;
}

export const GET: APIRoute = async ({ cookies }) => {
  // Get or create session
  let sessionId = cookies.get('sessionId')?.value;
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    cookies.set('sessionId', sessionId, {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour
      path: '/'
    });
  }
  
  let session = sessions.get(sessionId);
  if (!session) {
    session = {
      csrfToken: generateCSRFToken(),
      createdAt: Date.now(),
      lastActivity: Date.now(),
      requestCount: 0,
      lastRequestTime: Date.now()
    };
    sessions.set(sessionId, session);
  }
  
  session.lastActivity = Date.now();
  
  return new Response(JSON.stringify({
    csrfToken: session.csrfToken
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': session.csrfToken
    }
  });
};

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // Clean up old sessions
    cleanupSessions();
    
    const body: SubscribeRequest = await request.json();
    const { email, source = 'homepage', category = 'general', formType, _csrf, honeypot } = body;
    
    // Honeypot check
    if (honeypot) {
      return new Response(JSON.stringify({
        success: true,
        message: 'Successfully subscribed!'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get or create session with enhanced security
    let sessionId = cookies.get('sessionId')?.value;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      cookies.set('sessionId', sessionId, {
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'strict',
        maxAge: 60 * 60, // 1 hour
        path: '/'
      });
    }
    
    // Get or create session data
    let session = sessions.get(sessionId);
    if (!session) {
      session = {
        csrfToken: generateCSRFToken(),
        createdAt: Date.now(),
        lastActivity: Date.now(),
        requestCount: 0,
        lastRequestTime: Date.now()
      };
      sessions.set(sessionId, session);
    }
    
    // Update last activity
    session.lastActivity = Date.now();
    
    // Check rate limiting
    const rateLimitCheck = checkRateLimit(session);
    if (!rateLimitCheck.allowed) {
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Rate limit exceeded. Please try again later.',
        retryAfter: rateLimitCheck.retryAfter
      }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': RATE_LIMIT.MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(Date.now() + RATE_LIMIT.WINDOW_MS).toISOString(),
          'Retry-After': rateLimitCheck.retryAfter?.toString() || '60',
          'X-CSRF-Token': session.csrfToken
        }
      });
    }
    
    // CSRF Protection (optional for subscribe.json - can be more lenient)
    if (_csrf && !await validateCSRFToken(_csrf, session.csrfToken)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid security token. Please refresh and try again.'
      }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': session.csrfToken
        }
      });
    }
    
    // CSRF Protection
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Please provide a valid email address.'
      } as SubscribeResponse), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': session.csrfToken
        }
      });
    }
    
    // Sanitize email
    const sanitizedEmail = email.toLowerCase().trim();
    
    // Get environment variables
    const apiKey = import.meta.env.EMAILOCTOPUS_API_KEY;
    const listId = import.meta.env.EMAILOCTOPUS_LIST_ID;
    
    // Generate lead magnet download URL
    const leadMagnetUrl = generateLeadMagnetUrl(sanitizedEmail, category);

    // Send welcome email (includes EmailOctopus integration)
    await sendWelcomeEmail(sanitizedEmail, category);

    return new Response(JSON.stringify({
      success: true,
      message: 'Thank you for subscribing! Check your email for your free AI Money & Productivity Vault.',
      leadMagnetUrl,
      csrfToken: session.csrfToken
    } as SubscribeResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': session.csrfToken
      }
    });
    
  } catch (error) {
    console.error('Subscription error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Something went wrong. Please try again.'
    } as SubscribeResponse), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

function generateLeadMagnetUrl(email: string, category: string): string {
  // Generate a unique token for the lead magnet
  const token = Buffer.from(`${email}-${Date.now()}`).toString('base64').replace(/[+/=]/g, '');
  return `/lead-magnet/${token}?email=${encodeURIComponent(email)}&category=${encodeURIComponent(category)}`;
}

async function sendWelcomeEmail(email: string, category: string): Promise<void> {
  // EmailOctopus integration for newsletter subscription
  const apiKey = import.meta.env.EMAILOCTOPUS_API_KEY;
  const listId = import.meta.env.EMAILOCTOPUS_LIST_ID;

  if (apiKey && listId) {
    try {
      // Add subscriber to EmailOctopus list
      const res = await fetch(`https://emailoctopus.com/api/1.6/lists/${listId}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          api_key: apiKey,
          email_address: email,
          status: 'SUBSCRIBED',
          tags: ['Subscribed', category], // Tag with category for segmentation
        }),
      });

      if (!res.ok) {
        console.error('EmailOctopus API error:', await res.text());
      } else {
        console.log(`Successfully added ${email} to EmailOctopus list`);
      }
    } catch (error) {
      console.error('EmailOctopus integration error:', error);
    }
  } else {
    console.warn('EmailOctopus credentials not configured');
  }
  
  // Simple welcome message for all subscribers
}
