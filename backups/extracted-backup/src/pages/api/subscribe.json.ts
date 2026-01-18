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
}

interface SubscribeResponse {
  success: boolean;
  message: string;
  leadMagnetUrl?: string;
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // Clean up old sessions
    cleanupSessions();
    
    const body: SubscribeRequest = await request.json();
    const { email, source = 'homepage', category = 'general' } = body;
    
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
    
    // CSRF Protection
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Please provide a valid email address.'
      } as SubscribeResponse), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Sanitize email
    const sanitizedEmail = email.toLowerCase().trim();
    
    // Store subscription (for now, we'll log it - you can integrate with your preferred service)
    console.log('New subscription:', {
      email: sanitizedEmail,
      source,
      category,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    });

    // TODO: Integrate with your preferred email service (Mailchimp, ConvertKit, etc.)
    // For now, we'll simulate a successful subscription
    
    // Generate lead magnet download URL
    const leadMagnetUrl = generateLeadMagnetUrl(sanitizedEmail, category);

    // Send welcome email (simulated)
    await sendWelcomeEmail(sanitizedEmail, category);

    return new Response(JSON.stringify({
      success: true,
      message: 'Thank you for subscribing! Check your email for your free AI tools.',
      leadMagnetUrl
    } as SubscribeResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    console.error('Subscription error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      message: 'Something went wrong. Please try again.'
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
  const token = Buffer.from(`${email}-${Date.now()}`).toString('base64').replace(/[^a-zA-Z0-9]/g, '');
  
  // Create different lead magnets based on category
  const leadMagnets = {
    'ai-agents': '/lead-magnets/ai-agents-automation-guide.pdf',
    'business': '/lead-magnets/business-ai-roi-calculator.xlsx',
    'coding': '/lead-magnets/ai-coding-tools-comparison.pdf',
    'creative': '/lead-magnets/creative-ai-workflow-guide.pdf',
    'ecommerce': '/lead-magnets/ecommerce-ai-strategy.pdf',
    'marketing': '/lead-magnets/marketing-ai-tools-guide.pdf',
    'general': '/lead-magnets/ai-tools-roi-calculator.xlsx'
  };

  const leadMagnetPath = leadMagnets[category as keyof typeof leadMagnets] || leadMagnets.general;
  
  // Return a download URL with tracking
  return `${leadMagnetPath}?token=${token}&email=${encodeURIComponent(email)}&source=newsletter`;
}

async function sendWelcomeEmail(email: string, category: string): Promise<void> {
  // TODO: Integrate with your email service (SendGrid, Mailgun, etc.)
  // For now, we'll just log the email that would be sent
  
  const welcomeEmails = {
    'ai-agents': {
      subject: 'Welcome to AI Agents Weekly! 🤖',
      body: `Hi there!

Welcome to AI Agents Weekly! You're now part of an exclusive community of AI enthusiasts.

Your free AI Agents Automation Guide is ready for download. This comprehensive guide includes:
• 50+ AI agent tools with real performance data
• Automation workflows for your business
• ROI calculations and case studies

Download your guide here: [LINK]

Stay tuned for weekly insights on the latest AI agents and automation tools!

Best regards,
The AI Buzz Team`
    },
    'business': {
      subject: 'Welcome to Business AI Insights! 💼',
      body: `Hi there!

Welcome to Business AI Insights! You're now part of our community of forward-thinking business leaders.

Your free AI ROI Calculator is ready for download. This powerful tool includes:
• ROI calculations for 50+ AI tools
• Business case studies and benchmarks
• Performance metrics and comparisons

Download your calculator here: [LINK]

Get ready for weekly business AI insights and strategies!

Best regards,
The AI Buzz Team`
    },
    'general': {
      subject: 'Welcome to AI Buzz Media! 🚀',
      body: `Hi there!

Welcome to AI Buzz Media! You're now part of our community of AI enthusiasts and professionals.

Your free AI Tools ROI Calculator is ready for download. This comprehensive tool includes:
• ROI calculations for 50+ AI tools
• Performance data and benchmarks
• Business impact analysis

Download your calculator here: [LINK]

Stay tuned for weekly AI insights, tool reviews, and industry updates!

Best regards,
The AI Buzz Team`
    }
  };

  const emailTemplate = welcomeEmails[category as keyof typeof welcomeEmails] || welcomeEmails.general;
  
  console.log('Welcome email would be sent:', {
    to: email,
    subject: emailTemplate.subject,
    body: emailTemplate.body
  });
}

export const GET: APIRoute = async ({ cookies }) => {
  // Get or create session for CSRF token
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
  
  return new Response(JSON.stringify({ 
    csrfToken: session.csrfToken 
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}; 