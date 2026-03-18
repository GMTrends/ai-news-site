import { j as defineMiddleware, s as sequence } from "./chunks/vendor_BQ-iwbOC.mjs";
import "es-module-lexer";
import "cookie";
const rateLimitStore = /* @__PURE__ */ new Map();
rateLimitStore.clear();
const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": `
    default-src 'self'; 
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://www.googletagmanager.com https://www.google-analytics.com https://static.ads-twitter.com http://static.ads-twitter.com https://cdn.jsdelivr.net; 
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
    font-src 'self' https://fonts.gstatic.com; 
    img-src 'self' data: https: blob: https://www.facebook.com http://www.facebook.com https://www.google-analytics.com https://*.facebook.com; 
    connect-src 'self' http://localhost:3333 https://*.sanity.io https://www.facebook.com http://www.facebook.com https://*.facebook.com https://www.google-analytics.com https://www.googletagmanager.com https://static.ads-twitter.com http://static.ads-twitter.com;
    frame-src 'self' https://www.facebook.com;
  `.replace(/\s+/g, " ").trim()
};
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  maxRequests: 100,
  // max 100 requests per window
  adminMaxRequests: 20
  // stricter limit for admin routes
};
function getRateLimitKey(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "unknown";
  return ip;
}
function isRateLimited(key, maxRequests) {
  const now = Date.now();
  const record = rateLimitStore.get(key);
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs
    });
    return false;
  }
  if (record.count >= maxRequests) {
    return true;
  }
  record.count++;
  return false;
}
const onRequest$1 = defineMiddleware(async (context, next) => {
  const { request, url } = context;
  const isLocalhost = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if (isLocalhost) {
    const response2 = await next();
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response2.headers.set(key, value);
    });
    if (url.pathname.startsWith("/admin")) {
      response2.headers.set("X-Admin-Access", "true");
      response2.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    }
    return response2;
  }
  const rateLimitKey = getRateLimitKey(request);
  const isAdminRoute = url.pathname.startsWith("/admin");
  url.pathname.startsWith("/api");
  let maxRequests = RATE_LIMIT.maxRequests;
  if (isAdminRoute) {
    maxRequests = RATE_LIMIT.adminMaxRequests;
  }
  if (isRateLimited(rateLimitKey, maxRequests)) {
    const response2 = await next();
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response2.headers.set(key, value);
    });
    if (isAdminRoute) {
      response2.headers.set("X-Admin-Access", "true");
      response2.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    }
    return response2;
  }
  const response = await next();
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  if (isAdminRoute) {
    response.headers.set("X-Admin-Access", "true");
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  }
  return response;
});
const onRequest = sequence(
  onRequest$1
);
export {
  onRequest
};
