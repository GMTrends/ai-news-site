import type { MiddlewareHandler } from 'astro'
import { defineMiddleware } from 'astro:middleware'

// Simple in-memory rate limiting (for production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Clear rate limit store for local development
rateLimitStore.clear()

// Security headers configuration
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': `
    default-src 'self'; 
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://www.googletagmanager.com https://www.google-analytics.com https://static.ads-twitter.com http://static.ads-twitter.com https://cdn.jsdelivr.net; 
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
    font-src 'self' https://fonts.gstatic.com; 
    img-src 'self' data: https: blob: https://www.facebook.com http://www.facebook.com https://www.google-analytics.com https://*.facebook.com; 
    connect-src 'self' https://www.facebook.com http://www.facebook.com https://*.facebook.com https://www.google-analytics.com https://www.googletagmanager.com https://static.ads-twitter.com http://static.ads-twitter.com;
    frame-src 'self' https://www.facebook.com;
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

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url } = context

  // Skip rate limiting for local development
  const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1'
  if (isLocalhost) {
    // Continue to the next middleware or route without rate limiting
    const response = await next()

    // Add security headers to all responses
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    // Add additional security headers for admin routes
    if (url.pathname.startsWith('/admin')) {
      response.headers.set('X-Admin-Access', 'true')
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    }

    return response
  }

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
})
