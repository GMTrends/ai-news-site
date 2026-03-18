import { b as createAstro, d as createComponent, g as renderTemplate, e as addAttribute, r as renderHead } from "../../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import "clsx";
/* empty css                                     */
import { r } from "../../chunks/data-vendor_CAsGKFmz.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("http://localhost:4321");
const prerender = false;
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.props;
  const url = new URL(Astro2.request.url);
  const token = url.searchParams.get("token");
  const email = url.searchParams.get("email");
  const source = url.searchParams.get("source");
  if (!token || !email) {
    return Astro2.redirect("/404");
  }
  const leadMagnets = {
    "ai-tools-roi-calculator.xlsx": {
      title: "AI Tools ROI Calculator + Performance Matrix",
      description: "Compare 50+ AI tools with real performance data and calculate potential ROI for your business.",
      fileUrl: "/assets/lead-magnets/ai-tools-roi-calculator.xlsx",
      category: "general"
    },
    "ai-agents-automation-guide.pdf": {
      title: "AI Agents Automation Guide",
      description: "Complete guide to AI agents, automation workflows, and business applications.",
      fileUrl: "/assets/lead-magnets/ai-agents-automation-guide.pdf",
      category: "ai-agents"
    },
    "business-ai-roi-calculator.xlsx": {
      title: "Business AI ROI Calculator",
      description: "Calculate ROI for AI tools in your business with real case studies and benchmarks.",
      fileUrl: "/assets/lead-magnets/business-ai-roi-calculator.xlsx",
      category: "business"
    },
    "ai-coding-tools-comparison.pdf": {
      title: "AI Coding Tools Comparison Guide",
      description: "Compare the best AI coding tools with performance metrics and use cases.",
      fileUrl: "/assets/lead-magnets/ai-coding-tools-comparison.pdf",
      category: "productivity"
    },
    "creative-ai-workflow-guide.pdf": {
      title: "Creative AI Workflow Guide",
      description: "Optimize your creative workflow with AI tools and automation.",
      fileUrl: "/assets/lead-magnets/creative-ai-workflow-guide.pdf",
      category: "creative"
    },
    "ecommerce-ai-strategy.pdf": {
      title: "E-commerce AI Strategy Guide",
      description: "Boost your e-commerce business with AI-powered strategies and tools.",
      fileUrl: "/assets/lead-magnets/ecommerce-ai-strategy.pdf",
      category: "ecommerce"
    },
    "marketing-ai-tools-guide.pdf": {
      title: "Marketing AI Tools Guide",
      description: "Discover the best AI tools for marketing and automation.",
      fileUrl: "/assets/lead-magnets/marketing-ai-tools-guide.pdf",
      category: "marketing"
    }
  };
  const leadMagnet = leadMagnets[slug];
  if (!leadMagnet) {
    return Astro2.redirect("/404");
  }
  console.log("Lead magnet download:", {
    slug,
    email,
    source,
    token,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    userAgent: Astro2.request.headers.get("user-agent")
  });
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-gcfeycc3> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', ' - AI Buzz Media</title><meta name="description"', '><!-- Open Graph --><meta property="og:title"', '><meta property="og:description"', '><meta property="og:type" content="website">', '</head> <body data-astro-cid-gcfeycc3> <div class="download-container" data-astro-cid-gcfeycc3> <div class="download-icon" data-astro-cid-gcfeycc3>📊</div> <h1 class="download-title" data-astro-cid-gcfeycc3>', '</h1> <p class="download-description" data-astro-cid-gcfeycc3>', "</p> <a", ` class="download-button" download data-astro-cid-gcfeycc3>
Download Now
</a> <div class="download-info" data-astro-cid-gcfeycc3> <p data-astro-cid-gcfeycc3>✅ Your download will start automatically</p> <p data-astro-cid-gcfeycc3>📧 Check your email for additional resources</p> <p data-astro-cid-gcfeycc3>🔒 Your information is secure and private</p> </div> <a href="/" class="back-link" data-astro-cid-gcfeycc3>← Back to AI Buzz Media</a> </div> <script>
    // Track the download
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'lead_magnet_download', {
        'event_category': 'engagement',
        'event_label': '{slug}',
        'custom_parameter': '{email}'
      });
    }
    
    // Auto-download after a short delay
    setTimeout(() => {
      const downloadLink = document.querySelector('.download-button');
      if (downloadLink && downloadLink instanceof HTMLAnchorElement) {
        downloadLink.click();
      }
    }, 2000);
  <\/script> </body> </html>`])), leadMagnet.title, addAttribute(leadMagnet.description, "content"), addAttribute(leadMagnet.title, "content"), addAttribute(leadMagnet.description, "content"), renderHead(), leadMagnet.title, leadMagnet.description, addAttribute(leadMagnet.fileUrl, "href"));
}, "/workspaces/ai-news-site/src/pages/lead-magnets/[slug].astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/lead-magnets/[slug].astro";
const $$url = "/lead-magnets/[slug]";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
