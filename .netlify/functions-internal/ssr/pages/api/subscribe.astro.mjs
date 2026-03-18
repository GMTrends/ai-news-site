import { r } from "../../chunks/data-vendor_CAsGKFmz.mjs";
const sessions = /* @__PURE__ */ new Map();
const RATE_LIMIT = {
  MAX_REQUESTS: 3,
  // Max requests per window (more restrictive for newsletter)
  WINDOW_MS: 60 * 1e3,
  // 1 minute window
  CLEANUP_INTERVAL: 60 * 60 * 1e3
  // 1 hour cleanup
};
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
const POST = async ({ request, cookies }) => {
  try {
    cleanupSessions();
    const body = await request.json();
    const { email, source = "homepage", category = "general" } = body;
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
    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({
        success: false,
        message: "Please provide a valid email address."
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
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
      leadMagnetUrl
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Something went wrong. Please try again."
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
function generateLeadMagnetUrl(email, category) {
  const token = Buffer.from(`${email}-${Date.now()}`).toString("base64").replace(/[^a-zA-Z0-9]/g, "");
  const leadMagnetPath = "/lead-magnets/2025 AI Money & Productivity Vault.zip";
  return `${leadMagnetPath}?token=${token}&email=${encodeURIComponent(email)}&source=newsletter`;
}
async function sendWelcomeEmail(email, category) {
  {
    console.warn("EmailOctopus credentials not configured");
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
  return new Response(JSON.stringify({
    csrfToken: session.csrfToken
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
