import type { MiddlewareHandler } from 'astro'

// Simple in-memory rate limiting (for production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Security headers configuration
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': `
    default-src 'self'; 
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.sanity.io; 
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
    font-src 'self' https://fonts.gstatic.com; 
    img-src 'self' data: https: blob:; 
    connect-src 'self' https://crtekmb2.api.sanity.io;
  `.replace(/\s+/g, ' ').trim()
}

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // max 100 requests per window
  adminMaxRequests: 20 // stricter limit for admin routes
}

function getRateLimitKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
  return ip
}

function isRateLimited(key: string, maxRequests: number): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs
    })
    return false
  }

  if (record.count >= maxRequests) {
    return true
  }

  record.count++
  return false
}

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { request, url } = context

  // Get client identifier
  const rateLimitKey = getRateLimitKey(request)
  
  // Determine rate limit based on route
  const isAdminRoute = url.pathname.startsWith('/admin')
  const isApiRoute = url.pathname.startsWith('/api')
  
  let maxRequests = RATE_LIMIT.maxRequests
  if (isAdminRoute) {
    maxRequests = RATE_LIMIT.adminMaxRequests
  }

  // Check rate limit
  if (isRateLimited(rateLimitKey, maxRequests)) {
    console.warn(`Rate limit exceeded for ${rateLimitKey} on ${url.pathname}`)
    
    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '900', // 15 minutes
        'Content-Type': 'text/plain',
        ...securityHeaders
      }
    })
  }

  // Log suspicious activity
  if (isAdminRoute) {
    console.log(`Admin access attempt: ${rateLimitKey} -> ${url.pathname}`)
  }

  // Continue to the next middleware or route
  const response = await next()

  // Add security headers to all responses
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Add additional security headers for admin routes
  if (isAdminRoute) {
    response.headers.set('X-Admin-Access', 'true')
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  }

  return response
}
