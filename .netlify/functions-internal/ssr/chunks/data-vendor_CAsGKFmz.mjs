var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import fs from "fs/promises";
import path from "path";
import { createClient } from "@sanity/client";
import { c as createCollectionToGlobResultMap, a as createGetCollection } from "./vendor_BQ-iwbOC.mjs";
import { s as server_default } from "./react-core_B0-_Q1ya.mjs";
const renderers = [Object.assign({ "name": "@astrojs/react", "clientEntrypoint": "@astrojs/react/client.js", "serverEntrypoint": "@astrojs/react/server.js" }, { ssr: server_default })];
const contentDir = "/src/content/";
const contentEntryGlob = /* @__PURE__ */ Object.assign({ "/src/content/authors/john-doe.md": () => import("./john-doe_Ck9Cz7ao.mjs"), "/src/content/authors/raf-velazquez.md": () => import("./raf-velazquez_B_EPujCV.mjs"), "/src/content/authors/sarah-chen.md": () => import("./sarah-chen_BAGynoZ4.mjs"), "/src/content/blog/first-post.md": () => import("./first-post_B1NvGt7d.mjs"), "/src/content/blog/markdown-style-guide.md": () => import("./markdown-style-guide_DDLOm3Rn.mjs"), "/src/content/blog/second-post.md": () => import("./second-post_X5SdNvES.mjs"), "/src/content/blog/third-post.md": () => import("./third-post_DNH9hOaQ.mjs"), "/src/content/categories/ai-agents.md": () => import("./ai-agents_Dkw94T4g.mjs"), "/src/content/categories/business.md": () => import("./business_DoimlT_S.mjs"), "/src/content/pages/about.md": () => import("./about_Dg6oPihL.mjs") });
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
  globResult: contentEntryGlob,
  contentDir
});
const dataEntryGlob = /* @__PURE__ */ Object.assign({ "/src/content/site-settings/site-config.json": () => Promise.resolve().then(() => siteConfig) });
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
  globResult: dataEntryGlob,
  contentDir
});
createCollectionToGlobResultMap({
  globResult: { ...contentEntryGlob, ...dataEntryGlob },
  contentDir
});
let lookupMap = {};
lookupMap = { "authors": { "type": "content", "entries": { "john-doe": "/src/content/authors/john-doe.md", "raf-velazquez": "/src/content/authors/raf-velazquez.md", "sarah-chen": "/src/content/authors/sarah-chen.md" } }, "site-settings": { "type": "data", "entries": { "site-config": "/src/content/site-settings/site-config.json" } }, "blog": { "type": "content", "entries": { "first-post": "/src/content/blog/first-post.md", "markdown-style-guide": "/src/content/blog/markdown-style-guide.md", "second-post": "/src/content/blog/second-post.md", "third-post": "/src/content/blog/third-post.md" } }, "categories": { "type": "content", "entries": { "ai-agents": "/src/content/categories/ai-agents.md", "business": "/src/content/categories/business.md" } }, "pages": { "type": "content", "entries": { "about": "/src/content/pages/about.md" } } };
new Set(Object.keys(lookupMap));
function createGlobLookup(glob) {
  return async (collection2, lookupId) => {
    const filePath = lookupMap[collection2]?.entries[lookupId];
    if (!filePath) return void 0;
    return glob[collection2][filePath];
  };
}
const renderEntryGlob = /* @__PURE__ */ Object.assign({ "/src/content/authors/john-doe.md": () => import("./john-doe_C2Xn85di.mjs"), "/src/content/authors/raf-velazquez.md": () => import("./raf-velazquez_B9abd-ju.mjs"), "/src/content/authors/sarah-chen.md": () => import("./sarah-chen_ChYcaShT.mjs"), "/src/content/blog/first-post.md": () => import("./first-post_BD8Gm3Ou.mjs"), "/src/content/blog/markdown-style-guide.md": () => import("./markdown-style-guide_DOemTRzb.mjs"), "/src/content/blog/second-post.md": () => import("./second-post_BHiFIUcI.mjs"), "/src/content/blog/third-post.md": () => import("./third-post_BXPyQnFc.mjs"), "/src/content/categories/ai-agents.md": () => import("./ai-agents_BCLCLenb.mjs"), "/src/content/categories/business.md": () => import("./business_BJaCTfiO.mjs"), "/src/content/pages/about.md": () => import("./about_C2kKQHJ1.mjs") });
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
  globResult: renderEntryGlob,
  contentDir
});
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
const getCollection = createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
  cacheEntriesByCollection
});
const GET$5 = async ({ params }) => {
  try {
    const { slug } = params;
    if (!slug) {
      return new Response(JSON.stringify({ error: "Author slug is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const authors = await getCollection("authors");
    const author = authors.find((a) => a.slug === slug);
    if (!author) {
      return new Response(JSON.stringify({ error: "Author not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    return new Response(JSON.stringify(author), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error fetching author:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch author" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const PUT = async ({ params, request }) => {
  try {
    const { slug } = params;
    if (!slug) {
      return new Response(JSON.stringify({ error: "Author slug is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const body = await request.json();
    const { name, title, bio, avatar, social } = body;
    if (!name || !bio) {
      return new Response(JSON.stringify({
        error: "Missing required fields: name and bio are required"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const authors = await getCollection("authors");
    const authorExists = authors.some((author) => author.slug === slug);
    if (!authorExists) {
      return new Response(JSON.stringify({ error: "Author not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const authorContent = `---
name: ${name}
slug: ${slug}
title: ${title || ""}
bio: ${bio}
avatar: ${avatar || ""}
social:
  twitter: ${social?.twitter || ""}
  linkedin: ${social?.linkedin || ""}
  github: ${social?.github || ""}
---

${bio}
`;
    const authorsDir = path.join(process.cwd(), "src", "content", "authors");
    const filePath = path.join(authorsDir, `${slug}.md`);
    await fs.writeFile(filePath, authorContent, "utf-8");
    return new Response(JSON.stringify({
      success: true,
      message: "Author updated successfully",
      author: { name, slug, title, bio, avatar, social }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error updating author:", error);
    return new Response(JSON.stringify({
      error: "Failed to update author",
      details: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const DELETE = async ({ params }) => {
  try {
    const { slug } = params;
    if (!slug) {
      return new Response(JSON.stringify({ error: "Author slug is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const authors = await getCollection("authors");
    const authorExists = authors.some((author) => author.slug === slug);
    if (!authorExists) {
      return new Response(JSON.stringify({ error: "Author not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const authorsDir = path.join(process.cwd(), "src", "content", "authors");
    const filePath = path.join(authorsDir, `${slug}.md`);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error("Error deleting file:", error);
      return new Response(JSON.stringify({ error: "Failed to delete author file" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    return new Response(JSON.stringify({
      success: true,
      message: "Author deleted successfully"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error deleting author:", error);
    return new Response(JSON.stringify({
      error: "Failed to delete author",
      details: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const _page$6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DELETE,
  GET: GET$5,
  PUT
}, Symbol.toStringTag, { value: "Module" }));
const page$6 = () => _page$6;
const GET$4 = async () => {
  try {
    const authors = await getCollection("authors");
    return new Response(JSON.stringify(authors), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error fetching authors:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch authors" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const POST$4 = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, slug, title, bio, avatar, social } = body;
    if (!name || !slug || !bio) {
      return new Response(JSON.stringify({
        error: "Missing required fields: name, slug, and bio are required"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    try {
      const existingAuthors = await getCollection("authors");
      const slugExists = existingAuthors.some((author) => author.slug === slug);
      if (slugExists) {
        return new Response(JSON.stringify({
          error: "Author with this slug already exists"
        }), {
          status: 409,
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
    } catch (error) {
    }
    const authorContent = `---
name: ${name}
slug: ${slug}
title: ${title || ""}
bio: ${bio}
avatar: ${avatar || ""}
social:
  twitter: ${social?.twitter || ""}
  linkedin: ${social?.linkedin || ""}
  github: ${social?.github || ""}
---

${bio}
`;
    const authorsDir = path.join(process.cwd(), "src", "content", "authors");
    try {
      await fs.access(authorsDir);
    } catch {
      await fs.mkdir(authorsDir, { recursive: true });
    }
    const filePath = path.join(authorsDir, `${slug}.md`);
    await fs.writeFile(filePath, authorContent, "utf-8");
    return new Response(JSON.stringify({
      success: true,
      message: "Author created successfully",
      author: { name, slug, title, bio, avatar, social }
    }), {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error creating author:", error);
    return new Response(JSON.stringify({
      error: "Failed to create author",
      details: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const _page$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET: GET$4,
  POST: POST$4
}, Symbol.toStringTag, { value: "Module" }));
const page$5 = () => _page$5;
class SecurityLogger {
  constructor(config = {}) {
    __publicField(this, "config");
    __publicField(this, "logBuffer", []);
    __publicField(this, "MAX_BUFFER_SIZE", 100);
    this.config = {
      enableConsole: true,
      enableFile: false,
      enableExternal: false,
      logLevel: "info",
      maxFileSize: 10,
      maxFiles: 5,
      ...config
    };
  }
  /**
   * Log a security event
   */
  log(event) {
    const fullEvent = {
      ...event,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.logBuffer.push(fullEvent);
    if (this.logBuffer.length > this.MAX_BUFFER_SIZE) {
      this.logBuffer.shift();
    }
    if (this.config.enableConsole) {
      this.logToConsole(fullEvent);
    }
    if (this.config.enableFile) {
      this.logToFile(fullEvent);
    }
    if (this.config.enableExternal) {
      this.logToExternal(fullEvent);
    }
    this.detectSuspiciousActivity(fullEvent);
  }
  /**
   * Log API request
   */
  logApiRequest(endpoint, method, ip, userAgent, details = {}, sessionId, requestId) {
    this.log({
      eventType: "api_request",
      endpoint,
      method,
      ip,
      userAgent,
      details,
      severity: "low",
      sessionId,
      requestId
    });
  }
  /**
   * Log rate limit exceeded
   */
  logRateLimitExceeded(endpoint, ip, userAgent, details = {}, sessionId) {
    this.log({
      eventType: "rate_limit_exceeded",
      endpoint,
      method: "POST",
      ip,
      userAgent,
      details,
      severity: "medium",
      sessionId
    });
  }
  /**
   * Log validation failure
   */
  logValidationFailed(endpoint, method, ip, userAgent, details = {}, sessionId) {
    this.log({
      eventType: "validation_failed",
      endpoint,
      method,
      ip,
      userAgent,
      details,
      severity: "medium",
      sessionId
    });
  }
  /**
   * Log suspicious activity
   */
  logSuspiciousActivity(endpoint, method, ip, userAgent, details = {}, sessionId) {
    this.log({
      eventType: "suspicious_activity",
      endpoint,
      method,
      ip,
      userAgent,
      details,
      severity: "high",
      sessionId
    });
  }
  /**
   * Log error
   */
  logError(endpoint, method, ip, error, userAgent, details = {}, sessionId) {
    this.log({
      eventType: "error",
      endpoint,
      method,
      ip,
      userAgent,
      details: {
        ...details,
        errorMessage: error.message,
        errorStack: error.stack,
        errorName: error.name
      },
      severity: "high",
      sessionId
    });
  }
  /**
   * Log authentication event
   */
  logAuthentication(endpoint, method, ip, success, userAgent, details = {}, sessionId) {
    this.log({
      eventType: "authentication",
      endpoint,
      method,
      ip,
      userAgent,
      details: {
        ...details,
        success
      },
      severity: success ? "low" : "medium",
      sessionId
    });
  }
  /**
   * Log authorization event
   */
  logAuthorization(endpoint, method, ip, success, userAgent, details = {}, sessionId) {
    this.log({
      eventType: "authorization",
      endpoint,
      method,
      ip,
      userAgent,
      details: {
        ...details,
        success
      },
      severity: success ? "low" : "high",
      sessionId
    });
  }
  /**
   * Console logging with color coding
   */
  logToConsole(event) {
    const colors = {
      low: "\x1B[32m",
      // Green
      medium: "\x1B[33m",
      // Yellow
      high: "\x1B[31m",
      // Red
      critical: "\x1B[35m"
      // Magenta
    };
    const reset = "\x1B[0m";
    const color = colors[event.severity] || colors.low;
    const logMessage = `${color}[${event.timestamp}] ${event.severity.toUpperCase()}: ${event.eventType} - ${event.method} ${event.endpoint} from ${event.ip}${reset}`;
    if (event.severity === "critical" || event.severity === "high") {
      console.error(logMessage);
      if (event.details) {
        console.error(`${color}Details:${reset}`, event.details);
      }
    }
  }
  /**
   * File logging (placeholder for future implementation)
   */
  logToFile(event) {
  }
  /**
   * External logging (placeholder for future implementation)
   */
  logToExternal(event) {
  }
  /**
   * Detect suspicious activity patterns
   */
  detectSuspiciousActivity(event) {
    const suspiciousPatterns = [
      // Multiple failed validations from same IP
      {
        pattern: (events) => {
          const recentEvents = events.filter(
            (e) => e.ip === event.ip && e.eventType === "validation_failed" && new Date(e.timestamp).getTime() > Date.now() - 5 * 60 * 1e3
            // 5 minutes
          );
          return recentEvents.length >= 5;
        },
        message: "Multiple validation failures from same IP"
      },
      // Multiple rate limit violations from same IP
      {
        pattern: (events) => {
          const recentEvents = events.filter(
            (e) => e.ip === event.ip && e.eventType === "rate_limit_exceeded" && new Date(e.timestamp).getTime() > Date.now() - 10 * 60 * 1e3
            // 10 minutes
          );
          return recentEvents.length >= 3;
        },
        message: "Multiple rate limit violations from same IP"
      },
      // Suspicious user agents
      {
        pattern: (events) => {
          const suspiciousUserAgents = [
            "bot",
            "crawler",
            "spider",
            "scraper",
            "curl",
            "wget",
            "python",
            "java"
          ];
          return event.userAgent && suspiciousUserAgents.some(
            (agent) => event.userAgent.toLowerCase().includes(agent)
          );
        },
        message: "Suspicious user agent detected"
      }
    ];
    suspiciousPatterns.forEach(({ pattern, message }) => {
      if (pattern(this.logBuffer)) {
        this.logSuspiciousActivity(
          event.endpoint,
          event.method,
          event.ip,
          event.userAgent,
          { ...event.details, suspiciousPattern: message },
          event.sessionId
        );
      }
    });
  }
  /**
   * Get recent events for analysis
   */
  getRecentEvents(minutes = 60) {
    const cutoff = Date.now() - minutes * 60 * 1e3;
    return this.logBuffer.filter(
      (event) => new Date(event.timestamp).getTime() > cutoff
    );
  }
  /**
   * Get events by IP address
   */
  getEventsByIP(ip) {
    return this.logBuffer.filter((event) => event.ip === ip);
  }
  /**
   * Get events by severity
   */
  getEventsBySeverity(severity) {
    return this.logBuffer.filter((event) => event.severity === severity);
  }
  /**
   * Clear log buffer
   */
  clearBuffer() {
    this.logBuffer = [];
  }
  /**
   * Get buffer size
   */
  getBufferSize() {
    return this.logBuffer.length;
  }
}
const securityLogger = new SecurityLogger({
  enableConsole: true,
  enableFile: false,
  // Enable when file logging is implemented
  enableExternal: false,
  // Enable when external logging is implemented
  logLevel: "info"
});
const sessions$1 = /* @__PURE__ */ new Map();
const RATE_LIMIT$1 = {
  MAX_REQUESTS: 5,
  // Max requests per window
  WINDOW_MS: 60 * 1e3,
  // 1 minute window
  CLEANUP_INTERVAL: 60 * 60 * 1e3
  // 1 hour cleanup
};
async function validateCSRFToken$1(token, sessionToken) {
  if (!token || !sessionToken) return false;
  const start = Date.now();
  const isValid = token === sessionToken;
  const elapsed = Date.now() - start;
  const randomDelay = Math.random() * 10;
  if (elapsed < 5) {
    await new Promise((resolve) => setTimeout(resolve, randomDelay));
  }
  return isValid;
}
function generateCSRFToken$1() {
  return crypto.randomUUID();
}
function checkRateLimit$1(session) {
  const now = Date.now();
  if (now - session.lastRequestTime > RATE_LIMIT$1.WINDOW_MS) {
    session.requestCount = 0;
  }
  if (session.requestCount >= RATE_LIMIT$1.MAX_REQUESTS) {
    const retryAfter = Math.ceil((RATE_LIMIT$1.WINDOW_MS - (now - session.lastRequestTime)) / 1e3);
    return { allowed: false, retryAfter };
  }
  session.requestCount++;
  session.lastRequestTime = now;
  return { allowed: true };
}
function cleanupSessions$1() {
  const now = Date.now();
  for (const [sessionId, session] of sessions$1.entries()) {
    if (now - session.lastActivity > RATE_LIMIT$1.CLEANUP_INTERVAL) {
      sessions$1.delete(sessionId);
    }
  }
}
const POST$3 = async ({ request, cookies }) => {
  const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  const requestId = crypto.randomUUID();
  try {
    securityLogger.logApiRequest(
      "/api/contact",
      "POST",
      clientIP,
      userAgent,
      { requestId },
      cookies.get("sessionId")?.value,
      requestId
    );
    cleanupSessions$1();
    const data2 = await request.json();
    const { name, email, subject, message, honeypot, _csrf } = data2;
    let sessionId = cookies.get("sessionId")?.value;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      cookies.set("sessionId", sessionId, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60,
        // 1 hour
        path: "/"
      });
    }
    let session = sessions$1.get(sessionId);
    if (!session) {
      session = {
        csrfToken: generateCSRFToken$1(),
        createdAt: Date.now(),
        lastActivity: Date.now(),
        requestCount: 0,
        lastRequestTime: Date.now()
      };
      sessions$1.set(sessionId, session);
    }
    session.lastActivity = Date.now();
    const rateLimitCheck = checkRateLimit$1(session);
    if (!rateLimitCheck.allowed) {
      securityLogger.logRateLimitExceeded(
        "/api/contact",
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
        error: "Rate limit exceeded. Please try again later.",
        retryAfter: rateLimitCheck.retryAfter
      }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": RATE_LIMIT$1.MAX_REQUESTS.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": new Date(Date.now() + RATE_LIMIT$1.WINDOW_MS).toISOString(),
          "Retry-After": rateLimitCheck.retryAfter?.toString() || "60",
          "X-CSRF-Token": session.csrfToken
        }
      });
    }
    if (!_csrf || !await validateCSRFToken$1(_csrf, session.csrfToken)) {
      securityLogger.logValidationFailed(
        "/api/contact",
        "POST",
        clientIP,
        userAgent,
        {
          requestId,
          validationType: "CSRF",
          providedToken: _csrf ? "present" : "missing",
          sessionId
        },
        sessionId
      );
      return new Response(JSON.stringify({
        error: "CSRF token invalid or missing"
      }), {
        status: 403,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": session.csrfToken
          // Return new token
        }
      });
    }
    if (honeypot) {
      securityLogger.logSuspiciousActivity(
        "/api/contact",
        "POST",
        clientIP,
        userAgent,
        {
          requestId,
          activityType: "honeypot_triggered",
          sessionId
        },
        sessionId
      );
      return new Response(JSON.stringify({
        success: true,
        message: "Message sent successfully"
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": session.csrfToken
        }
      });
    }
    if (!name || !email || !subject || !message) {
      securityLogger.logValidationFailed(
        "/api/contact",
        "POST",
        clientIP,
        userAgent,
        {
          requestId,
          validationType: "required_fields",
          missingFields: [name ? null : "name", email ? null : "email", subject ? null : "subject", message ? null : "message"].filter(Boolean),
          sessionId
        },
        sessionId
      );
      return new Response(JSON.stringify({
        error: "All fields are required"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": session.csrfToken
        }
      });
    }
    if (name.length > 100 || email.length > 254 || subject.length > 200 || message.length > 5e3) {
      securityLogger.logValidationFailed(
        "/api/contact",
        "POST",
        clientIP,
        userAgent,
        {
          requestId,
          validationType: "field_length",
          fieldLengths: { name: name.length, email: email.length, subject: subject.length, message: message.length },
          sessionId
        },
        sessionId
      );
      return new Response(JSON.stringify({
        error: "Input too long. Please check field lengths."
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": session.csrfToken
        }
      });
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      securityLogger.logValidationFailed(
        "/api/contact",
        "POST",
        clientIP,
        userAgent,
        {
          requestId,
          validationType: "email_format",
          providedEmail: email,
          sessionId
        },
        sessionId
      );
      return new Response(JSON.stringify({
        error: "Invalid email address"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": session.csrfToken
        }
      });
    }
    const sanitizeInput = (input) => {
      return input.replace(/[<>]/g, "").replace(/["']/g, "").replace(/[&]/g, "&amp;").trim().substring(0, 5e3);
    };
    const sanitizedName = sanitizeInput(name);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);
    return new Response(JSON.stringify({
      success: true,
      message: "Message sent successfully. We will get back to you soon!"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": session.csrfToken,
        "X-RateLimit-Limit": RATE_LIMIT$1.MAX_REQUESTS.toString(),
        "X-RateLimit-Remaining": (RATE_LIMIT$1.MAX_REQUESTS - session.requestCount).toString(),
        "X-RateLimit-Reset": new Date(Date.now() + RATE_LIMIT$1.WINDOW_MS).toISOString()
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: "Failed to send message. Please try again later."
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const GET$3 = async ({ cookies }) => {
  let sessionId = cookies.get("sessionId")?.value;
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    cookies.set("sessionId", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60,
      // 1 hour
      path: "/"
    });
  }
  let session = sessions$1.get(sessionId);
  if (!session) {
    session = {
      csrfToken: generateCSRFToken$1(),
      createdAt: Date.now(),
      lastActivity: Date.now(),
      requestCount: 0,
      lastRequestTime: Date.now()
    };
    sessions$1.set(sessionId, session);
  }
  return new Response(JSON.stringify({
    csrfToken: session.csrfToken
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
const _page$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET: GET$3,
  POST: POST$3
}, Symbol.toStringTag, { value: "Module" }));
const page$4 = () => _page$4;
function generateLoremIpsumFiller(targetLength, existingText = "") {
  const loremWords = [
    "Lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "Ut",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "ut",
    "aliquip",
    "ex",
    "ea",
    "commodo",
    "consequat",
    "Duis",
    "aute",
    "irure",
    "dolor",
    "in",
    "reprehenderit",
    "voluptate",
    "velit",
    "esse",
    "cillum",
    "dolore",
    "eu",
    "fugiat",
    "nulla",
    "pariatur",
    "Excepteur",
    "sint",
    "occaecat",
    "cupidatat",
    "non",
    "proident",
    "sunt",
    "culpa",
    "qui",
    "officia",
    "deserunt",
    "mollit",
    "anim",
    "id",
    "est",
    "laborum",
    "Sed",
    "ut",
    "perspiciatis",
    "unde",
    "omnis",
    "iste",
    "natus",
    "error",
    "sit",
    "voluptatem",
    "accusantium",
    "doloremque",
    "laudantium",
    "totam",
    "rem",
    "aperiam",
    "eaque",
    "ipsa",
    "quae",
    "ab",
    "illo",
    "inventore",
    "veritatis",
    "et",
    "quasi",
    "architecto",
    "beatae",
    "vitae",
    "dicta",
    "sunt",
    "explicabo",
    "Nemo",
    "enim",
    "ipsam",
    "voluptatem",
    "quia",
    "voluptas",
    "sit",
    "aspernatur",
    "aut",
    "odit",
    "aut",
    "fugit",
    "sed",
    "quia",
    "consequuntur",
    "magni",
    "dolores",
    "eos",
    "qui",
    "ratione",
    "voluptatem",
    "sequi",
    "nesciunt",
    "Neque",
    "porro",
    "quisquam",
    "est",
    "qui",
    "dolorem",
    "ipsum",
    "quia",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipisci",
    "velit"
  ];
  let result = existingText;
  while (result.length < targetLength) {
    const randomWords = [];
    const wordsToAdd = Math.min(5 + Math.floor(Math.random() * 10), loremWords.length);
    for (let i = 0; i < wordsToAdd; i++) {
      const randomIndex = Math.floor(Math.random() * loremWords.length);
      randomWords.push(loremWords[randomIndex]);
    }
    const newText = randomWords.join(" ");
    if (result.length + newText.length + 1 <= targetLength) {
      result += (result ? " " : "") + newText;
    } else {
      break;
    }
  }
  return result;
}
function generateExcerpt(body, maxLength = 400) {
  if (!body || typeof body !== "string") {
    return "";
  }
  let cleanText = body.replace(/^#+\s+/gm, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/<[^>]*>/g, "").replace(/```[\s\S]*?```/g, "").replace(/`([^`]+)`/g, "$1").replace(/^>\s+/gm, "").replace(/^[\s]*[-*+]\s+/gm, "").replace(/^[\s]*\d+\.\s+/gm, "").replace(/\s+/g, " ").trim();
  if (cleanText.length <= maxLength) {
    return cleanText;
  }
  let truncated = cleanText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > maxLength * 0.8) {
    truncated = truncated.substring(0, lastSpace);
  }
  return truncated + "...";
}
function ensureExcerpt(article, maxLength = 400, useLoremIpsum = true) {
  if (article.excerpt && article.excerpt.trim()) {
    const excerpt = article.excerpt.trim();
    if (useLoremIpsum && excerpt.length < maxLength) {
      return generateLoremIpsumFiller(maxLength, excerpt);
    }
    return excerpt;
  }
  let bodyText = "";
  if (article.body && typeof article.body === "string") {
    bodyText = article.body;
  } else if (article.content) {
    if (Array.isArray(article.content)) {
      bodyText = article.content.filter((block) => block._type === "block" && block.children).map(
        (block) => block.children.filter((child) => child.text).map((child) => child.text).join(" ")
      ).join(" ");
    } else if (typeof article.content === "string") {
      bodyText = article.content;
    }
  }
  const generatedExcerpt = generateExcerpt(bodyText, maxLength);
  if (useLoremIpsum && generatedExcerpt.length < maxLength) {
    return generateLoremIpsumFiller(maxLength, generatedExcerpt);
  }
  return generatedExcerpt;
}
function calculateReadTime(article, wordsPerMinute = 225) {
  if (!article) return 1;
  let totalWords = 0;
  if (article.title) {
    totalWords += article.title.split(/\s+/).length;
  }
  if (article.excerpt) {
    totalWords += article.excerpt.split(/\s+/).length;
  }
  if (article.content) {
    if (Array.isArray(article.content)) {
      totalWords += article.content.map((block) => {
        if (block._type === "block" && Array.isArray(block.children)) {
          return block.children.map((child) => child.text).join(" ");
        }
        if (block._type === "htmlBlock" && typeof block.html === "string") {
          return block.html.replace(/<[^>]*>/g, " ");
        }
        return "";
      }).join(" ").split(/\s+/).length;
    } else if (typeof article.content === "string") {
      totalWords += article.content.split(/\s+/).length;
    }
  }
  if (article.body && typeof article.body === "string") {
    totalWords += article.body.split(/\s+/).length;
  }
  const readingTime = Math.ceil(totalWords / wordsPerMinute);
  return Math.max(1, readingTime);
}
const sanityClient = createClient({
  projectId: "crtekmb2",
  dataset: "production",
  useCdn: true,
  // Default to true
  apiVersion: "2024-01-01",
  token: void 0
  // Only for write operations
});
function urlFor(source) {
  if (!source?.asset?._ref) return null;
  const ref = source.asset._ref;
  const [, id2, dimensions, format] = ref.split("-");
  return `https://cdn.sanity.io/images/crtekmb2/production/${id2}-${dimensions}.${format}`;
}
function getImageUrl(image) {
  if (!image) {
    return null;
  }
  let url = null;
  if (typeof image === "string") {
    url = image;
  } else if (image.asset?.url) {
    url = image.asset.url;
  } else if (image.asset?._ref) {
    url = urlFor(image);
  } else if (image.url) {
    url = image.url;
  }
  if (url) {
    const separator = url.includes("?") ? "&" : "?";
    url = `${url}${separator}v=${Date.now()}`;
  }
  return url;
}
async function getFeaturedArticles(limit = 8) {
  try {
    const query = `*[_type == "article" && 
      (status == "published" || 
       (status == "scheduled" && publishedAt <= now())
      )
    ] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      status,
      heroPlacement,
      priority,
      revenueClassification,
      contentType,
      "author": author->{name, "slug": slug.current},
      "category": category->{name, displayName, slug, icon, color},
      "featuredImage": featuredImage{
        asset->{
          _id,
          url,
          metadata
        }
      },
      content
    }`;
    const featuredArticles = await sanityClient.fetch(query);
    const articlesWithImages = featuredArticles.map((article, index) => ({
      ...article,
      featuredImage: getImageUrl(article.featuredImage),
      excerpt: ensureExcerpt({
        excerpt: article.excerpt,
        content: article.content
      }, index === 0 ? 1e3 : 400, true)
      // Optimized excerpts: 1000 for first article, 400 for others, with Lorem Ipsum filling
    })).slice(0, limit);
    return articlesWithImages;
  } catch (error) {
    console.error("❌ Error fetching articles:", error);
    if (error instanceof Error) {
      console.error("❌ Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    return [];
  }
}
async function getArticlesByCategory(categorySlug, limit) {
  try {
    const query = `
        *[_type == "article" &&
          (status == "published" ||
           (status == "scheduled" && publishedAt <= now())
          ) &&
          category->slug.current == $categorySlug] | order(publishedAt desc) ${limit ? `[0...${limit}]` : ""} {
          _id,
          title,
          "slug": slug.current,
          excerpt,
          publishedAt,
          status,
          heroPlacement,
          priority,
          "author": author->{name, "slug": slug.current},
          "category": category->{name, displayName, slug, icon, color},
          "featuredImage": featuredImage{
            asset->{
              _id,
              url,
              metadata
            }
          },
          content
        }
      `;
    const articles = await sanityClient.fetch(query, { categorySlug });
    const articlesWithImages = articles.map((article) => ({
      ...article,
      featuredImage: getImageUrl(article.featuredImage),
      excerpt: ensureExcerpt({
        excerpt: article.excerpt,
        content: article.content
      }, 140, true)
      // Optimal length for homepage cards: 140 characters (20-25 words)
    }));
    return articlesWithImages;
  } catch (error) {
    console.error(`❌ Error fetching articles for category ${categorySlug}:`, error);
    return [];
  }
}
async function getArticlesByHeroPlacement(placement, limit = 8) {
  try {
    const query = `*[_type == "article" && 
      (status == "published" || 
       (status == "scheduled" && publishedAt <= now())
      ) &&
      heroPlacement == $placement
    ] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      status,
      heroPlacement,
      priority,
      revenueClassification,
      contentType,
      "author": author->{name, "slug": slug.current},
      "category": category->{name, displayName, slug, icon, color},
      "featuredImage": featuredImage{
        asset->{
          _id,
          url,
          metadata
        }
      },
      content
    }`;
    const articles = await sanityClient.fetch(query, { placement, limit });
    const articlesWithImages = articles.map((article) => ({
      ...article,
      featuredImage: getImageUrl(article.featuredImage),
      excerpt: ensureExcerpt({
        excerpt: article.excerpt,
        content: article.content
      }, placement === "large" ? 1e3 : 400, true)
      // Optimized excerpts: 1000 for large, 400 for small, with Lorem Ipsum filling
    }));
    return articlesWithImages;
  } catch (error) {
    console.error(`❌ Error fetching articles with heroPlacement ${placement}:`, error);
    return [];
  }
}
async function getAllArticles() {
  try {
    const articles = await sanityClient.fetch(`
      *[_type == "article" && 
        (status == "published" || 
         (status == "scheduled" && publishedAt <= now())
        )
      ] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        status,
        featuredImage {
          asset->
        },
        "author": author->{name, "slug": slug.current},
        "category": category->{name, displayName, slug, icon, color},
        body,
        content
      }
    `);
    return articles.map((article) => ({
      ...article,
      excerpt: ensureExcerpt({
        excerpt: article.excerpt,
        content: article.content
      }, 600, true)
      // Increased to 600 characters with Lorem Ipsum filling
    }));
  } catch (error) {
    console.error("❌ Error fetching all articles:", error);
    return [];
  }
}
const GET$2 = async () => {
  try {
    const articles = await getCollection("articles");
    async function getBodySnippet(slug) {
      try {
        const filePath = path.join(process.cwd(), "src", "content", "articles", `${slug}.md`);
        const file = await fs.readFile(filePath, "utf8");
        const body = file.replace(/^---[\s\S]*?---/, "").trim();
        return body.slice(0, 300);
      } catch (e) {
        return "";
      }
    }
    const localArticles = await Promise.all(articles.map(async (article) => {
      const bodySnippet = await getBodySnippet(article.slug);
      return {
        _id: article.id,
        title: article.data.title,
        slug: article.slug,
        category: {
          name: article.data.category || "Uncategorized",
          slug: article.data.category || "uncategorized"
        },
        excerpt: ensureExcerpt({
          excerpt: article.data.excerpt,
          body: bodySnippet
        }, 250),
        publishedAt: article.data.publishedAt || (/* @__PURE__ */ new Date()).toISOString(),
        author: {
          name: article.data.author || "Unknown",
          slug: article.data.author || "unknown"
        },
        body: bodySnippet
      };
    }));
    let sanityArticles = [];
    try {
      sanityArticles = await getAllArticles();
    } catch (err) {
      sanityArticles = [];
    }
    const transformedSanityArticles = sanityArticles.map((article) => ({
      _id: article._id,
      title: article.title,
      slug: article.slug,
      category: article.category && typeof article.category === "object" ? {
        name: article.category.name || "Uncategorized",
        slug: article.category.slug || "uncategorized"
      } : { name: article.category || "Uncategorized", slug: article.category || "uncategorized" },
      excerpt: ensureExcerpt({
        excerpt: article.excerpt,
        body: article.body,
        content: article.body
        // Sanity articles might have content in body field
      }, 250),
      publishedAt: article.publishedAt || (/* @__PURE__ */ new Date()).toISOString(),
      author: article.author && typeof article.author === "object" ? {
        name: article.author.name || "Unknown",
        slug: article.author.slug || "unknown"
      } : { name: article.author || "Unknown", slug: article.author || "unknown" },
      body: article.body || ""
    }));
    const allArticles = [...localArticles, ...transformedSanityArticles];
    return new Response(JSON.stringify(allArticles), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Search API error:", error);
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const _page$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET: GET$2
}, Symbol.toStringTag, { value: "Module" }));
const page$3 = () => _page$3;
class LockoutManager {
  constructor() {
    __publicField(this, "lockouts", /* @__PURE__ */ new Map());
    // Configuration
    __publicField(this, "MAX_ATTEMPTS", 5);
    __publicField(this, "LOCKOUT_DURATION", 30 * 60 * 1e3);
    // 30 minutes
    __publicField(this, "ATTEMPT_WINDOW", 15 * 60 * 1e3);
  }
  // 15 minutes
  // Check if IP is currently locked out
  isLockedOut(ip) {
    const record = this.lockouts.get(ip);
    if (!record || !record.lockedUntil) return false;
    if (Date.now() > record.lockedUntil.getTime()) {
      this.clearLockout(ip);
      return false;
    }
    return true;
  }
  // Record a failed authentication attempt
  recordFailedAttempt(ip) {
    const now = /* @__PURE__ */ new Date();
    let record = this.lockouts.get(ip);
    if (!record) {
      record = {
        attempts: 1,
        firstAttempt: now,
        ip
      };
    } else {
      if (now.getTime() - record.firstAttempt.getTime() > this.ATTEMPT_WINDOW) {
        record = {
          attempts: 1,
          firstAttempt: now,
          ip
        };
      } else {
        record.attempts++;
      }
    }
    if (record.attempts >= this.MAX_ATTEMPTS) {
      record.lockedUntil = new Date(now.getTime() + this.LOCKOUT_DURATION);
    }
    this.lockouts.set(ip, record);
    return {
      locked: !!record.lockedUntil,
      remainingAttempts: Math.max(0, this.MAX_ATTEMPTS - record.attempts),
      lockedUntil: record.lockedUntil
    };
  }
  // Record successful authentication (clears lockout)
  recordSuccessfulAuth(ip) {
    this.clearLockout(ip);
  }
  // Clear lockout for IP
  clearLockout(ip) {
    this.lockouts.delete(ip);
  }
  // Get lockout info for IP
  getLockoutInfo(ip) {
    const record = this.lockouts.get(ip);
    if (!record) return { locked: false };
    if (record.lockedUntil) {
      const remainingTime = record.lockedUntil.getTime() - Date.now();
      if (remainingTime > 0) {
        return {
          locked: true,
          remainingTime: Math.ceil(remainingTime / 1e3),
          // seconds
          attempts: record.attempts
        };
      }
    }
    return {
      locked: false,
      attempts: record.attempts
    };
  }
  // Clean up expired lockouts (call periodically)
  cleanup() {
    const now = Date.now();
    for (const [ip, record] of this.lockouts.entries()) {
      if (record.lockedUntil && now > record.lockedUntil.getTime()) {
        this.lockouts.delete(ip);
      }
    }
  }
  // Get statistics
  getStats() {
    const activeLockouts = Array.from(this.lockouts.values()).filter(
      (record) => record.lockedUntil && Date.now() < record.lockedUntil.getTime()
    ).length;
    return {
      totalLockouts: this.lockouts.size,
      activeLockouts
    };
  }
}
const lockoutManager = new LockoutManager();
setInterval(() => {
  lockoutManager.cleanup();
}, 5 * 60 * 1e3);
function getClientIP(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const clientIP = request.headers.get("cf-connecting-ip");
  return forwarded?.split(",")[0] || realIP || clientIP || "unknown";
}
const POST$2 = async ({ request }) => {
  const ip = getClientIP(request);
  const { action, success } = await request.json();
  if (action === "check") {
    const lockoutInfo = lockoutManager.getLockoutInfo(ip);
    return new Response(JSON.stringify(lockoutInfo), {
      status: lockoutInfo.locked ? 423 : 200,
      // 423 = Locked
      headers: { "Content-Type": "application/json" }
    });
  }
  if (action === "auth_attempt") {
    if (success) {
      lockoutManager.recordSuccessfulAuth(ip);
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      const result = lockoutManager.recordFailedAttempt(ip);
      return new Response(JSON.stringify(result), {
        status: result.locked ? 423 : 200,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
  return new Response("Invalid action", { status: 400 });
};
const GET$1 = async ({ request }) => {
  const ip = getClientIP(request);
  const stats = lockoutManager.getStats();
  const lockoutInfo = lockoutManager.getLockoutInfo(ip);
  return new Response(JSON.stringify({
    ...stats,
    currentIP: lockoutInfo
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
const _page$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET: GET$1,
  POST: POST$2
}, Symbol.toStringTag, { value: "Module" }));
const page$2 = () => _page$2;
const sessions = /* @__PURE__ */ new Map();
const RATE_LIMIT = {
  MAX_REQUESTS: 3,
  // Max requests per window (more restrictive for newsletter)
  WINDOW_MS: 60 * 1e3,
  // 1 minute window
  CLEANUP_INTERVAL: 60 * 60 * 1e3
  // 1 hour cleanup
};
async function validateCSRFToken(token, sessionToken) {
  if (!token || !sessionToken) return false;
  const start = Date.now();
  const isValid = token === sessionToken;
  const elapsed = Date.now() - start;
  const randomDelay = Math.random() * 10;
  if (elapsed < 5) {
    await new Promise((resolve) => setTimeout(resolve, randomDelay));
  }
  return isValid;
}
function generateCSRFToken() {
  return crypto.randomUUID();
}
function checkRateLimit(session) {
  const now = Date.now();
  if (now - session.lastRequestTime > RATE_LIMIT.WINDOW_MS) {
    session.requestCount = 0;
  }
  if (session.requestCount >= RATE_LIMIT.MAX_REQUESTS) {
    const retryAfter = Math.ceil((RATE_LIMIT.WINDOW_MS - (now - session.lastRequestTime)) / 1e3);
    return { allowed: false, retryAfter };
  }
  session.requestCount++;
  session.lastRequestTime = now;
  return { allowed: true };
}
function cleanupSessions() {
  const now = Date.now();
  for (const [sessionId, session] of sessions.entries()) {
    if (now - session.lastActivity > RATE_LIMIT.CLEANUP_INTERVAL) {
      sessions.delete(sessionId);
    }
  }
}
const GET = async ({ cookies }) => {
  let sessionId = cookies.get("sessionId")?.value;
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    cookies.set("sessionId", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60,
      // 1 hour
      path: "/"
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
      "Content-Type": "application/json",
      "X-CSRF-Token": session.csrfToken
    }
  });
};
const POST$1 = async ({ request, cookies }) => {
  try {
    cleanupSessions();
    const body = await request.json();
    const { email, source = "homepage", category = "general", formType, _csrf, honeypot } = body;
    if (honeypot) {
      return new Response(JSON.stringify({
        success: true,
        message: "Successfully subscribed!"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    let sessionId = cookies.get("sessionId")?.value;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      cookies.set("sessionId", sessionId, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60,
        // 1 hour
        path: "/"
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
    const rateLimitCheck = checkRateLimit(session);
    if (!rateLimitCheck.allowed) {
      return new Response(JSON.stringify({
        success: false,
        error: "Rate limit exceeded. Please try again later.",
        retryAfter: rateLimitCheck.retryAfter
      }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": RATE_LIMIT.MAX_REQUESTS.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": new Date(Date.now() + RATE_LIMIT.WINDOW_MS).toISOString(),
          "Retry-After": rateLimitCheck.retryAfter?.toString() || "60",
          "X-CSRF-Token": session.csrfToken
        }
      });
    }
    if (_csrf && !await validateCSRFToken(_csrf, session.csrfToken)) {
      return new Response(JSON.stringify({
        success: false,
        error: "Invalid security token. Please refresh and try again."
      }), {
        status: 403,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": session.csrfToken
        }
      });
    }
    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({
        success: false,
        error: "Please provide a valid email address."
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": session.csrfToken
        }
      });
    }
    const sanitizedEmail = email.toLowerCase().trim();
    const apiKey = void 0;
    const listId = void 0;
    const leadMagnetUrl = generateLeadMagnetUrl(sanitizedEmail, category);
    await sendWelcomeEmail(sanitizedEmail, category);
    return new Response(JSON.stringify({
      success: true,
      message: "Thank you for subscribing! Check your email for your free AI Money & Productivity Vault.",
      leadMagnetUrl,
      csrfToken: session.csrfToken
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": session.csrfToken
      }
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Something went wrong. Please try again."
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
function generateLeadMagnetUrl(email, category) {
  const token = Buffer.from(`${email}-${Date.now()}`).toString("base64").replace(/[+/=]/g, "");
  return `/lead-magnet/${token}?email=${encodeURIComponent(email)}&category=${encodeURIComponent(category)}`;
}
async function sendWelcomeEmail(email, category) {
  {
    console.warn("EmailOctopus credentials not configured");
  }
}
const _page$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET,
  POST: POST$1
}, Symbol.toStringTag, { value: "Module" }));
const page$1 = () => _page$1;
const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get("avatar");
    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    if (!file.type.startsWith("image/")) {
      return new Response(JSON.stringify({ error: "File must be an image" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return new Response(JSON.stringify({ error: "File size must be less than 5MB" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    const filename = `avatar-${timestamp}.${fileExtension}`;
    const uploadsDir = path.join(process.cwd(), "public", "images", "authors");
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }
    const filePath = path.join(uploadsDir, filename);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);
    const publicPath = `/images/authors/${filename}`;
    return new Response(JSON.stringify({
      success: true,
      message: "Avatar uploaded successfully",
      filePath: publicPath,
      filename
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return new Response(JSON.stringify({
      error: "Failed to upload avatar",
      details: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
const id = "site-config";
const collection = "site-settings";
const data = { siteTitle: "AI Buzz Media", siteDescription: "Latest AI news, reviews, and insights from the world of artificial intelligence", googleAnalyticsId: "", facebookPixelId: "", twitterHandle: "@aibuzzmedia", linkedinUrl: "https://linkedin.com/company/aibuzzmedia", contactEmail: "contact@aibuzzmedia.com", newsletterText: "Get weekly AI news and analysis delivered to your inbox", footerCopyright: "© 2024 AI Buzz Media. All rights reserved." };
const _internal = {
  type: "data",
  filePath: "/workspaces/ai-news-site/src/content/site-settings/site-config.json",
  rawData: ""
};
const siteConfig = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _internal,
  collection,
  data,
  id
}, Symbol.toStringTag, { value: "Module" }));
export {
  getImageUrl as a,
  getArticlesByCategory as b,
  getAllArticles as c,
  getFeaturedArticles as d,
  getArticlesByHeroPlacement as e,
  ensureExcerpt as f,
  getCollection as g,
  calculateReadTime as h,
  page$5 as i,
  page$4 as j,
  page$3 as k,
  page$2 as l,
  page$1 as m,
  page as n,
  page$6 as p,
  renderers as r,
  sanityClient as s
};
