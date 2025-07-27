import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { securityLogger } from '../../lib/security-logger';

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
  MAX_REQUESTS: 5, // Max requests per window
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

export const POST: APIRoute = async ({ request, cookies }) => {
  // Get client IP and user agent for logging
  const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const requestId = crypto.randomUUID();

  try {
    // Log API request
    securityLogger.logApiRequest(
      '/api/contact',
      'POST',
      clientIP,
      userAgent,
      { requestId },
      cookies.get('sessionId')?.value,
      requestId
    );

    // Clean up old sessions
    cleanupSessions();
    
    const data = await request.json();
    const { name, email, subject, message, honeypot, _csrf } = data;
    
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
      // Log rate limit exceeded
      securityLogger.logRateLimitExceeded(
        '/api/contact',
        clientIP,
        userAgent,
        { 
          requestId,
          retryAfter: rateLimitCheck.retryAfter,
          sessionId 
        },
        sessionId
      );

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
    if (!_csrf || !await validateCSRFToken(_csrf, session.csrfToken)) {
      // Log CSRF validation failure
      securityLogger.logValidationFailed(
        '/api/contact',
        'POST',
        clientIP,
        userAgent,
        { 
          requestId,
          validationType: 'CSRF',
          providedToken: _csrf ? 'present' : 'missing',
          sessionId 
        },
        sessionId
      );

      return new Response(JSON.stringify({ 
        error: 'CSRF token invalid or missing' 
      }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': session.csrfToken // Return new token
        }
      });
    }
    
    // Honeypot validation to prevent spam
    if (honeypot) {
      // Log honeypot triggered (potential spam)
      securityLogger.logSuspiciousActivity(
        '/api/contact',
        'POST',
        clientIP,
        userAgent,
        { 
          requestId,
          activityType: 'honeypot_triggered',
          sessionId 
        },
        sessionId
      );

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully' 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': session.csrfToken
        }
      });
    }
    
    // Enhanced validation with length limits
    if (!name || !email || !subject || !message) {
      // Log validation failure
      securityLogger.logValidationFailed(
        '/api/contact',
        'POST',
        clientIP,
        userAgent,
        { 
          requestId,
          validationType: 'required_fields',
          missingFields: [name ? null : 'name', email ? null : 'email', subject ? null : 'subject', message ? null : 'message'].filter(Boolean),
          sessionId 
        },
        sessionId
      );

      return new Response(JSON.stringify({ 
        error: 'All fields are required' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': session.csrfToken
        }
      });
    }
    
    // Length validation to prevent abuse
    if (name.length > 100 || email.length > 254 || subject.length > 200 || message.length > 5000) {
      // Log validation failure
      securityLogger.logValidationFailed(
        '/api/contact',
        'POST',
        clientIP,
        userAgent,
        { 
          requestId,
          validationType: 'field_length',
          fieldLengths: { name: name.length, email: email.length, subject: subject.length, message: message.length },
          sessionId 
        },
        sessionId
      );

      return new Response(JSON.stringify({ 
        error: 'Input too long. Please check field lengths.' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': session.csrfToken
        }
      });
    }
    
    // Enhanced email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      // Log validation failure
      securityLogger.logValidationFailed(
        '/api/contact',
        'POST',
        clientIP,
        userAgent,
        { 
          requestId,
          validationType: 'email_format',
          providedEmail: email,
          sessionId 
        },
        sessionId
      );

      return new Response(JSON.stringify({ 
        error: 'Invalid email address' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': session.csrfToken
        }
      });
    }
    
    // Enhanced XSS Protection - Sanitize inputs
    const sanitizeInput = (input: string): string => {
      return input
        .replace(/[<>]/g, '') // Remove angle brackets
        .replace(/["']/g, '') // Remove quotes
        .replace(/[&]/g, '&amp;') // Encode ampersands
        .trim()
        .substring(0, 5000); // Limit length
    };
    
    const sanitizedName = sanitizeInput(name);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);
    
    // Log the contact form submission with enhanced security
    console.log('Contact Form Submission:', {
      name: sanitizedName,
      email: email.toLowerCase(), // Normalize email
      subject: sanitizedSubject,
      messageLength: sanitizedMessage.length,
      timestamp: new Date().toISOString(),
      sessionId,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    });
    
    // In production, this would send an email
    // For now, simulate success
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Message sent successfully. We will get back to you soon!' 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': session.csrfToken,
        'X-RateLimit-Limit': RATE_LIMIT.MAX_REQUESTS.toString(),
        'X-RateLimit-Remaining': (RATE_LIMIT.MAX_REQUESTS - session.requestCount).toString(),
        'X-RateLimit-Reset': new Date(Date.now() + RATE_LIMIT.WINDOW_MS).toISOString()
      }
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to send message. Please try again later.' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

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