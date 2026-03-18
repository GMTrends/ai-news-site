import { d as createComponent, g as renderTemplate, h as defineScriptVars, e as addAttribute, m as maybeRenderHead, f as renderComponent } from "../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { $ as $$MainLayout } from "../chunks/MainLayout_DdYH-KlJ.mjs";
import "clsx";
/* empty css                                               */
import { r } from "../chunks/data-vendor_CAsGKFmz.mjs";
const aiTools = [
  {
    id: "jasper-ai",
    name: "Jasper AI",
    category: "marketing",
    subcategory: "Content Creation",
    pricing: { free: false, starter: 39, pro: 99, enterprise: "Custom" },
    features: ["AI Writing", "Brand Voice", "Templates", "Plagiarism Checker", "SEO Optimization"],
    rating: 4.5,
    reviewCount: 1250,
    bestFor: ["Content Teams", "Marketing Agencies", "Bloggers"],
    pros: ["High-quality output", "Brand voice training", "Extensive templates"],
    cons: ["Expensive for individuals", "Learning curve"],
    affiliateLink: "#jasper-affiliate-placeholder",
    logoUrl: "/images/tools/jasper-logo.png",
    description: "AI-powered content creation platform for marketing teams and agencies.",
    lastUpdated: "2024-01-15",
    popularity: 9
  },
  {
    id: "copy-ai",
    name: "Copy.ai",
    category: "marketing",
    subcategory: "Content Creation",
    pricing: { free: true, starter: 36, pro: 186, enterprise: "Custom" },
    features: ["AI Copywriting", "Workflows", "Brand Kit", "Collaboration", "API Access"],
    rating: 4.3,
    reviewCount: 890,
    bestFor: ["Small Businesses", "Freelancers", "Startups"],
    pros: ["Generous free plan", "User-friendly interface", "Good value"],
    cons: ["Output quality varies", "Limited advanced features"],
    affiliateLink: "#copy-ai-affiliate-placeholder",
    logoUrl: "/images/tools/copy-ai-logo.png",
    description: "Versatile AI writing assistant with workflow automation capabilities.",
    lastUpdated: "2024-01-10",
    popularity: 8
  },
  {
    id: "zapier-ai",
    name: "Zapier AI",
    category: "automation",
    subcategory: "Business Automation",
    pricing: { free: true, starter: 19.99, pro: 49, enterprise: "Custom" },
    features: ["AI Automation", "Workflow Builder", "6000+ Integrations", "Custom Logic", "Error Handling"],
    rating: 4.6,
    reviewCount: 3200,
    bestFor: ["Business Automation", "Workflow Optimization", "Integration Management"],
    pros: ["Massive integration library", "User-friendly", "Reliable"],
    cons: ["Can get expensive", "Complex workflows hard to debug"],
    affiliateLink: "#zapier-affiliate-placeholder",
    logoUrl: "/images/tools/zapier-logo.png",
    description: "Leading automation platform with AI-powered workflow suggestions.",
    lastUpdated: "2024-01-14",
    popularity: 10
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    category: "agents",
    subcategory: "Coding Agents",
    pricing: { free: false, starter: 10, pro: 19, enterprise: "39" },
    features: ["AI Code Completion", "Multi-language Support", "Context Awareness", "Code Suggestions", "IDE Integration"],
    rating: 4.7,
    reviewCount: 5600,
    bestFor: ["Developers", "Development Teams", "Code Learning"],
    pros: ["Excellent code suggestions", "Wide language support", "IDE integration"],
    cons: ["Subscription required", "Sometimes inaccurate suggestions"],
    affiliateLink: "#copilot-affiliate-placeholder",
    logoUrl: "/images/tools/copilot-logo.png",
    description: "AI pair programmer that helps developers write code faster and more efficiently.",
    lastUpdated: "2024-01-16",
    popularity: 9
  },
  {
    id: "seowriting",
    name: "SEOWriting.ai",
    category: "marketing",
    subcategory: "content-creation",
    description: "AI-powered SEO content writing tool that creates optimized articles, blog posts, and web copy.",
    pricing: {
      free: true,
      starter: 16,
      pro: 48,
      enterprise: null
    },
    features: ["SEO optimization", "Bulk content generation", "Keyword research", "Content templates", "Plagiarism checker", "Multi-language support"],
    pros: ["Excellent SEO optimization", "Bulk generation capabilities", "Affordable pricing"],
    cons: ["Limited customization", "Requires SEO knowledge"],
    rating: 4.3,
    reviewCount: 892,
    bestFor: ["SEO agencies", "Content marketers", "Bloggers"],
    affiliateLink: "https://affiliate-placeholder.com/seowriting",
    logoUrl: "/logos/seowriting.png",
    lastUpdated: "2024-01-15",
    popularity: 85
  },
  {
    id: "genspark",
    name: "GenSpark",
    category: "agents",
    subcategory: "research",
    description: "AI-powered research and content generation platform with advanced reasoning capabilities.",
    pricing: {
      free: true,
      starter: 20,
      pro: 50,
      enterprise: "150"
    },
    features: ["Advanced research", "Multi-source analysis", "Citation tracking", "Content synthesis", "Real-time data", "Custom workflows"],
    pros: ["Excellent research quality", "Real-time information", "Citation accuracy"],
    cons: ["Learning curve", "Premium features expensive"],
    rating: 4.6,
    reviewCount: 567,
    bestFor: ["Researchers", "Analysts", "Content creators"],
    affiliateLink: "https://affiliate-placeholder.com/genspark",
    logoUrl: "/logos/genspark.png",
    lastUpdated: "2024-01-18",
    popularity: 78
  },
  {
    id: "claude",
    name: "Claude (Anthropic)",
    category: "agents",
    subcategory: "general-purpose",
    description: "Advanced AI assistant for analysis, writing, coding, and complex reasoning tasks.",
    pricing: {
      free: true,
      starter: 20,
      pro: 200,
      enterprise: null
    },
    features: ["Advanced reasoning", "Code generation", "Document analysis", "Creative writing", "Research assistance", "Safety-focused"],
    pros: ["Excellent reasoning", "Safety-focused", "Versatile capabilities"],
    cons: ["Usage limits on free tier", "Premium pricing"],
    rating: 4.8,
    reviewCount: 2341,
    bestFor: ["Developers", "Researchers", "Writers"],
    affiliateLink: "https://affiliate-placeholder.com/claude",
    logoUrl: "/logos/claude.png",
    lastUpdated: "2024-01-20",
    popularity: 95
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    category: "agents",
    subcategory: "research",
    description: "AI-powered search and research tool that provides accurate, cited answers to complex questions.",
    pricing: {
      free: true,
      starter: 20,
      pro: null,
      enterprise: null
    },
    features: ["Real-time search", "Source citations", "Follow-up questions", "Academic mode", "Image analysis", "Mobile app"],
    pros: ["Accurate citations", "Real-time information", "Clean interface"],
    cons: ["Limited free queries", "Subscription required for heavy use"],
    rating: 4.5,
    reviewCount: 1876,
    bestFor: ["Students", "Researchers", "Journalists"],
    affiliateLink: "https://affiliate-placeholder.com/perplexity",
    logoUrl: "/logos/perplexity.png",
    lastUpdated: "2024-01-19",
    popularity: 88
  },
  {
    id: "midjourney",
    name: "Midjourney",
    category: "marketing",
    subcategory: "visual-content",
    description: "AI image generation tool for creating stunning artwork, marketing visuals, and creative content.",
    pricing: {
      free: false,
      starter: 10,
      pro: 30,
      enterprise: "60"
    },
    features: ["High-quality images", "Style variations", "Upscaling", "Custom prompts", "Community gallery", "Commercial license"],
    pros: ["Exceptional image quality", "Creative flexibility", "Active community"],
    cons: ["No free tier", "Discord-based interface", "Learning curve"],
    rating: 4.7,
    reviewCount: 3421,
    bestFor: ["Designers", "Marketers", "Content creators"],
    affiliateLink: "https://affiliate-placeholder.com/midjourney",
    logoUrl: "/logos/midjourney.png",
    lastUpdated: "2024-01-17",
    popularity: 92
  },
  {
    id: "runway",
    name: "Runway ML",
    category: "marketing",
    subcategory: "visual-content",
    description: "AI-powered video editing and generation platform for creating professional video content.",
    pricing: {
      free: true,
      starter: 15,
      pro: 35,
      enterprise: "76"
    },
    features: ["Video generation", "AI editing tools", "Green screen removal", "Motion tracking", "Style transfer", "Collaboration tools"],
    pros: ["Cutting-edge video AI", "Professional features", "Regular updates"],
    cons: ["Resource intensive", "Steep learning curve", "Credit-based pricing"],
    rating: 4.4,
    reviewCount: 1234,
    bestFor: ["Video creators", "Marketing teams", "Filmmakers"],
    affiliateLink: "https://affiliate-placeholder.com/runway",
    logoUrl: "/logos/runway.png",
    lastUpdated: "2024-01-16",
    popularity: 81
  },
  {
    id: "writesonic",
    name: "Writesonic",
    category: "marketing",
    subcategory: "content-creation",
    description: "AI writing assistant for creating marketing copy, blog posts, and social media content.",
    pricing: {
      free: true,
      starter: 16,
      pro: 33,
      enterprise: null
    },
    features: ["AI article writer", "Ad copy generator", "Social media posts", "Email templates", "SEO optimization", "Brand voice"],
    pros: ["Versatile templates", "Good value for money", "SEO features"],
    cons: ["Quality varies", "Limited customization", "Credit system"],
    rating: 4.2,
    reviewCount: 2156,
    bestFor: ["Small businesses", "Marketers", "Agencies"],
    affiliateLink: "https://affiliate-placeholder.com/writesonic",
    logoUrl: "/logos/writesonic.png",
    lastUpdated: "2024-01-14",
    popularity: 79
  },
  {
    id: "n8n",
    name: "n8n",
    category: "automation",
    subcategory: "workflow",
    description: "Open-source workflow automation tool that connects different services and automates tasks.",
    pricing: {
      free: true,
      starter: 20,
      pro: 50,
      enterprise: null
    },
    features: ["Visual workflow builder", "400+ integrations", "Self-hosted option", "Custom nodes", "Webhook support", "Conditional logic"],
    pros: ["Open source", "Highly customizable", "Strong community"],
    cons: ["Technical setup required", "Learning curve", "Limited support on free tier"],
    rating: 4.5,
    reviewCount: 987,
    bestFor: ["Developers", "Technical teams", "SMBs"],
    affiliateLink: "https://affiliate-placeholder.com/n8n",
    logoUrl: "/logos/n8n.png",
    lastUpdated: "2024-01-12",
    popularity: 73
  },
  {
    id: "cursor",
    name: "Cursor",
    category: "agents",
    subcategory: "coding",
    description: "AI-powered code editor that helps developers write, edit, and debug code faster.",
    pricing: {
      free: true,
      starter: 20,
      pro: null,
      enterprise: null
    },
    features: ["AI code completion", "Chat with codebase", "Code generation", "Bug fixing", "Refactoring", "Multi-language support"],
    pros: ["Excellent code understanding", "Fast performance", "Great UX"],
    cons: ["Limited to coding", "Subscription for advanced features"],
    rating: 4.8,
    reviewCount: 1543,
    bestFor: ["Developers", "Software teams", "Freelancers"],
    affiliateLink: "https://affiliate-placeholder.com/cursor",
    logoUrl: "/logos/cursor.png",
    lastUpdated: "2024-01-21",
    popularity: 89
  },
  {
    id: "framer",
    name: "Framer",
    category: "marketing",
    subcategory: "web-design",
    description: "AI-powered website builder and design tool for creating professional websites without coding.",
    pricing: {
      free: true,
      starter: 5,
      pro: 15,
      enterprise: null
    },
    features: ["AI website generation", "Responsive design", "CMS integration", "Custom domains", "SEO optimization", "Analytics"],
    pros: ["Beautiful designs", "No-code approach", "Fast deployment"],
    cons: ["Limited customization", "Template-based", "Hosting dependency"],
    rating: 4.6,
    reviewCount: 2876,
    bestFor: ["Designers", "Small businesses", "Startups"],
    affiliateLink: "https://affiliate-placeholder.com/framer",
    logoUrl: "/logos/framer.png",
    lastUpdated: "2024-01-13",
    popularity: 84
  },
  {
    id: "make",
    name: "Make",
    category: "automation",
    subcategory: "workflow",
    description: "Visual automation platform that connects apps and services to automate workflows without coding.",
    pricing: {
      free: true,
      starter: 9,
      pro: 16,
      enterprise: "29"
    },
    features: ["Visual workflow builder", "1000+ app integrations", "Real-time execution", "Error handling", "Webhooks", "Data transformation"],
    pros: ["User-friendly interface", "Extensive integrations", "Reliable execution"],
    cons: ["Can get expensive", "Complex workflows need learning", "Limited free tier"],
    rating: 4.6,
    reviewCount: 3247,
    bestFor: ["Small businesses", "Marketing teams", "Operations"],
    affiliateLink: "https://affiliate-placeholder.com/make",
    logoUrl: "/logos/make.png",
    lastUpdated: "2024-01-22",
    popularity: 87
  },
  {
    id: "adcreative",
    name: "AdCreative.ai",
    category: "marketing",
    subcategory: "advertising",
    description: "AI-powered ad creative generator that creates high-converting ad creatives for social media and display advertising.",
    pricing: {
      free: true,
      starter: 21,
      pro: 44,
      enterprise: "74"
    },
    features: ["AI ad generation", "A/B testing insights", "Brand customization", "Multiple formats", "Performance analytics", "Creative scoring"],
    pros: ["High conversion rates", "Time-saving automation", "Data-driven insights"],
    cons: ["Limited free credits", "Learning curve for optimization"],
    rating: 4.5,
    reviewCount: 1876,
    bestFor: ["Digital marketers", "Agencies", "E-commerce"],
    affiliateLink: "https://affiliate-placeholder.com/adcreative",
    logoUrl: "/logos/adcreative.png",
    lastUpdated: "2024-01-23",
    popularity: 82
  },
  {
    id: "arcards",
    name: "Arcards.ai",
    category: "marketing",
    subcategory: "advertising",
    description: "AI-powered platform for creating interactive and engaging ad cards and promotional content.",
    pricing: {
      free: true,
      starter: 15,
      pro: 35,
      enterprise: null
    },
    features: ["Interactive ad cards", "Template library", "Animation effects", "Mobile optimization", "Analytics tracking", "Brand consistency"],
    pros: ["Engaging interactive content", "Easy to use", "Mobile-first design"],
    cons: ["Limited customization", "Newer platform", "Small template library"],
    rating: 4.2,
    reviewCount: 543,
    bestFor: ["Social media marketers", "Small businesses", "Content creators"],
    affiliateLink: "https://affiliate-placeholder.com/arcards",
    logoUrl: "/logos/arcards.png",
    lastUpdated: "2024-01-20",
    popularity: 68
  },
  {
    id: "aha-ads",
    name: "Aha Ads",
    category: "marketing",
    subcategory: "advertising",
    description: "AI-driven advertising platform that optimizes ad campaigns across multiple channels for maximum ROI.",
    pricing: {
      free: false,
      starter: 29,
      pro: 79,
      enterprise: "199"
    },
    features: ["Multi-channel optimization", "Real-time bidding", "Audience targeting", "Campaign automation", "ROI tracking", "Creative testing"],
    pros: ["Excellent ROI optimization", "Multi-platform support", "Advanced targeting"],
    cons: ["No free tier", "Complex setup", "Requires ad spend budget"],
    rating: 4.4,
    reviewCount: 892,
    bestFor: ["Performance marketers", "Large businesses", "Ad agencies"],
    affiliateLink: "https://affiliate-placeholder.com/aha-ads",
    logoUrl: "/logos/aha-ads.png",
    lastUpdated: "2024-01-21",
    popularity: 75
  },
  {
    id: "buildyourstore",
    name: "BuildYourStore",
    category: "marketing",
    subcategory: "ecommerce",
    description: "AI-powered eCommerce store builder that creates optimized online stores with automated product research and setup.",
    pricing: {
      free: true,
      starter: 29,
      pro: 79,
      enterprise: "199"
    },
    features: ["AI store generation", "Product research", "SEO optimization", "Payment integration", "Inventory management", "Marketing automation"],
    pros: ["Quick store setup", "Built-in product research", "SEO-optimized"],
    cons: ["Limited customization", "Monthly fees", "Learning curve"],
    rating: 4.3,
    reviewCount: 1234,
    bestFor: ["Dropshippers", "New entrepreneurs", "Small businesses"],
    affiliateLink: "https://affiliate-placeholder.com/buildyourstore",
    logoUrl: "/logos/buildyourstore.png",
    lastUpdated: "2024-01-24",
    popularity: 76
  },
  {
    id: "zik-analytics",
    name: "Zik Analytics",
    category: "marketing",
    subcategory: "ecommerce",
    description: "AI-driven product research and market analysis tool for eBay and eCommerce sellers.",
    pricing: {
      free: true,
      starter: 29,
      pro: 59,
      enterprise: "99"
    },
    features: ["Product research", "Market analysis", "Competitor tracking", "Profit calculator", "Trend analysis", "Supplier finder"],
    pros: ["Comprehensive data", "eBay integration", "Profitable product finder"],
    cons: ["Primarily eBay focused", "Data can be overwhelming", "Subscription required"],
    rating: 4.4,
    reviewCount: 2156,
    bestFor: ["eBay sellers", "Product researchers", "Dropshippers"],
    affiliateLink: "https://affiliate-placeholder.com/zik-analytics",
    logoUrl: "/logos/zik-analytics.png",
    lastUpdated: "2024-01-25",
    popularity: 79
  },
  {
    id: "shopify",
    name: "Shopify",
    category: "marketing",
    subcategory: "ecommerce",
    description: "Leading eCommerce platform with AI-powered features for building and scaling online stores.",
    pricing: {
      free: false,
      starter: 29,
      pro: 79,
      enterprise: "299"
    },
    features: ["Store builder", "Payment processing", "Inventory management", "AI recommendations", "App ecosystem", "Multi-channel selling"],
    pros: ["Industry leader", "Extensive app store", "Scalable platform"],
    cons: ["Transaction fees", "Can get expensive", "Learning curve for advanced features"],
    rating: 4.6,
    reviewCount: 15432,
    bestFor: ["All business sizes", "Serious sellers", "Growing brands"],
    affiliateLink: "https://affiliate-placeholder.com/shopify",
    logoUrl: "/logos/shopify.png",
    lastUpdated: "2024-01-26",
    popularity: 95
  },
  {
    id: "autods",
    name: "AutoDS",
    category: "automation",
    subcategory: "ecommerce",
    description: "AI-powered dropshipping automation platform that handles product sourcing, pricing, and order fulfillment.",
    pricing: {
      free: true,
      starter: 7,
      pro: 17,
      enterprise: "77"
    },
    features: ["Product sourcing", "Price monitoring", "Order automation", "Inventory sync", "Supplier integration", "Analytics dashboard"],
    pros: ["Full automation", "Multiple supplier support", "Affordable pricing"],
    cons: ["Dropshipping focused", "Requires supplier accounts", "Learning curve"],
    rating: 4.5,
    reviewCount: 3421,
    bestFor: ["Dropshippers", "Amazon sellers", "eBay sellers"],
    affiliateLink: "https://affiliate-placeholder.com/autods",
    logoUrl: "/logos/autods.png",
    lastUpdated: "2024-01-27",
    popularity: 83
  },
  {
    id: "manus-ai",
    name: "Manus AI",
    category: "agents",
    subcategory: "content-creation",
    description: "AI-powered writing assistant and content creation agent that helps with research, writing, and editing tasks.",
    pricing: {
      free: true,
      starter: 19,
      pro: 49,
      enterprise: null
    },
    features: ["AI writing assistance", "Research automation", "Content editing", "Citation management", "Multiple formats", "Collaboration tools"],
    pros: ["Excellent writing quality", "Research integration", "User-friendly interface"],
    cons: ["Limited free tier", "Newer platform", "Learning curve for advanced features"],
    rating: 4.3,
    reviewCount: 876,
    bestFor: ["Writers", "Researchers", "Content creators"],
    affiliateLink: "https://affiliate-placeholder.com/manus-ai",
    logoUrl: "/logos/manus-ai.png",
    lastUpdated: "2024-01-28",
    popularity: 72
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    category: "automation",
    subcategory: "workflow",
    description: "All-in-one workspace with AI writing, planning, and organization features for entrepreneurs and teams.",
    pricing: {
      free: true,
      starter: 8,
      pro: 15,
      enterprise: null
    },
    features: ["AI writing assistant", "Project management", "Note-taking", "Database creation", "Team collaboration", "Template library"],
    pros: ["Ultimate flexibility", "AI-powered content", "Great for startups", "Scales with business"],
    cons: ["Learning curve", "Can be overwhelming", "AI features cost extra"],
    rating: 4.7,
    reviewCount: 12543,
    bestFor: ["Entrepreneurs", "Startups", "Remote teams"],
    affiliateLink: "https://affiliate-placeholder.com/notion",
    logoUrl: "/logos/notion.png",
    lastUpdated: "2024-01-29",
    popularity: 94
  },
  {
    id: "canva",
    name: "Canva",
    category: "marketing",
    subcategory: "visual-content",
    description: "AI-powered design platform for creating professional graphics, presentations, and marketing materials.",
    pricing: {
      free: true,
      starter: 15,
      pro: 45,
      enterprise: null
    },
    features: ["AI design suggestions", "Brand kit", "Template library", "Photo editing", "Video creation", "Print services"],
    pros: ["Beginner-friendly", "Professional results", "Huge template library", "AI magic tools"],
    cons: ["Limited advanced features", "Subscription for best features", "Can look template-y"],
    rating: 4.8,
    reviewCount: 25678,
    bestFor: ["Non-designers", "Small businesses", "Social media managers"],
    affiliateLink: "https://affiliate-placeholder.com/canva",
    logoUrl: "/logos/canva.png",
    lastUpdated: "2024-01-30",
    popularity: 96
  },
  {
    id: "grammarly",
    name: "Grammarly",
    category: "agents",
    subcategory: "content-creation",
    description: "AI writing assistant that helps entrepreneurs communicate professionally across all platforms.",
    pricing: {
      free: true,
      starter: 12,
      pro: 15,
      enterprise: null
    },
    features: ["Grammar checking", "Tone detection", "Plagiarism detection", "Writing suggestions", "Browser extension", "Mobile keyboard"],
    pros: ["Essential for professional communication", "Works everywhere", "Improves credibility"],
    cons: ["Can be overly cautious", "Premium features costly", "Sometimes misses context"],
    rating: 4.6,
    reviewCount: 8934,
    bestFor: ["All entrepreneurs", "Non-native speakers", "Professional writers"],
    affiliateLink: "https://affiliate-placeholder.com/grammarly",
    logoUrl: "/logos/grammarly.png",
    lastUpdated: "2024-01-31",
    popularity: 91
  },
  {
    id: "calendly",
    name: "Calendly",
    category: "automation",
    subcategory: "workflow",
    description: "AI-powered scheduling tool that eliminates back-and-forth emails and automates meeting bookings.",
    pricing: {
      free: true,
      starter: 8,
      pro: 12,
      enterprise: "16"
    },
    features: ["Smart scheduling", "Calendar integration", "Automated reminders", "Meeting preferences", "Team scheduling", "Analytics"],
    pros: ["Saves massive time", "Professional impression", "Integrates with everything"],
    cons: ["Limited customization on free plan", "Can seem impersonal", "Timezone confusion"],
    rating: 4.7,
    reviewCount: 6789,
    bestFor: ["Service providers", "Consultants", "Sales teams"],
    affiliateLink: "https://affiliate-placeholder.com/calendly",
    logoUrl: "/logos/calendly.png",
    lastUpdated: "2024-02-01",
    popularity: 88
  },
  {
    id: "loom",
    name: "Loom",
    category: "marketing",
    subcategory: "content-creation",
    description: "AI-powered video messaging tool for creating quick explanations, tutorials, and personal communications.",
    pricing: {
      free: true,
      starter: 8,
      pro: 16,
      enterprise: null
    },
    features: ["Screen recording", "AI transcription", "Video editing", "Custom thumbnails", "Analytics", "Team libraries"],
    pros: ["Incredibly easy to use", "Personal touch", "Great for remote work", "AI transcription"],
    cons: ["Limited editing features", "Storage limits", "Video quality limits on free"],
    rating: 4.8,
    reviewCount: 4567,
    bestFor: ["Remote teams", "Customer support", "Sales outreach"],
    affiliateLink: "https://affiliate-placeholder.com/loom",
    logoUrl: "/logos/loom.png",
    lastUpdated: "2024-02-02",
    popularity: 85
  },
  {
    id: "slack",
    name: "Slack",
    category: "automation",
    subcategory: "workflow",
    description: "AI-enhanced team communication platform with smart notifications and workflow automation.",
    pricing: {
      free: true,
      starter: 8,
      pro: 15,
      enterprise: "23"
    },
    features: ["AI search", "Channel organization", "App integrations", "Workflow automation", "Voice/video calls", "File sharing"],
    pros: ["Essential for remote teams", "Huge integration ecosystem", "AI-powered search"],
    cons: ["Can be distracting", "Notification overload", "Expensive for large teams"],
    rating: 4.5,
    reviewCount: 18765,
    bestFor: ["Remote teams", "Tech startups", "Growing companies"],
    affiliateLink: "https://affiliate-placeholder.com/slack",
    logoUrl: "/logos/slack.png",
    lastUpdated: "2024-02-03",
    popularity: 92
  },
  {
    id: "airtable",
    name: "Airtable",
    category: "automation",
    subcategory: "workflow",
    description: "AI-powered database and project management tool that combines spreadsheets with database functionality.",
    pricing: {
      free: true,
      starter: 20,
      pro: 45,
      enterprise: null
    },
    features: ["AI-powered insights", "Custom databases", "Automation rules", "Form creation", "API access", "Team collaboration"],
    pros: ["Incredibly flexible", "No-code database", "Great for CRM", "Scales well"],
    cons: ["Learning curve", "Can get expensive", "Complex for simple needs"],
    rating: 4.6,
    reviewCount: 7891,
    bestFor: ["Data-driven entrepreneurs", "Project managers", "Growing teams"],
    affiliateLink: "https://affiliate-placeholder.com/airtable",
    logoUrl: "/logos/airtable.png",
    lastUpdated: "2024-02-04",
    popularity: 86
  }
];
const categories = [
  { value: "all", label: "All Categories" },
  { value: "marketing", label: "AI Marketing" },
  { value: "agents", label: "AI Agents" },
  { value: "automation", label: "Automation" }
];
const subcategories = [
  { value: "all", label: "All Subcategories" },
  { value: "content-creation", label: "Content Creation" },
  { value: "social-media", label: "Social Media" },
  { value: "visual-content", label: "Visual Content" },
  { value: "web-design", label: "Web Design" },
  { value: "advertising", label: "Advertising" },
  { value: "ecommerce", label: "eCommerce" },
  { value: "general-purpose", label: "General Purpose" },
  { value: "coding", label: "Coding" },
  { value: "research", label: "Research" },
  { value: "workflow", label: "Workflow" }
];
const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "free", label: "Free Available" },
  { value: "under-25", label: "Under $25/mo" },
  { value: "25-100", label: "$25-100/mo" },
  { value: "over-100", label: "Over $100/mo" }
];
const sortOptions = [
  { value: "popularity", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" }
];
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$AIToolsComparison = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<section class="tools-comparison-section" data-astro-cid-onzwjtds> <div class="comparison-container" data-astro-cid-onzwjtds> <div class="comparison-header" data-astro-cid-onzwjtds> <h2 class="comparison-title" data-astro-cid-onzwjtds>Best AI Tools for Entrepreneurs</h2> <p class="comparison-subtitle" data-astro-cid-onzwjtds>Discover the AI tools that will accelerate your business growth and success</p> </div> <!-- Filters and Controls --> <div class="comparison-controls" data-astro-cid-onzwjtds> <div class="filters-row" data-astro-cid-onzwjtds> <select id="category-filter" class="filter-select" data-astro-cid-onzwjtds> ', ' </select> <select id="subcategory-filter" class="filter-select" data-astro-cid-onzwjtds> ', ' </select> <select id="price-filter" class="filter-select" data-astro-cid-onzwjtds> ', ' </select> <select id="sort-select" class="filter-select" data-astro-cid-onzwjtds> ', ' </select> </div> <div class="search-row" data-astro-cid-onzwjtds> <input type="text" id="search-input" placeholder="Search tools..." class="search-input" data-astro-cid-onzwjtds> <button id="clear-filters" class="clear-button" data-astro-cid-onzwjtds>Clear</button> </div> </div> <!-- Comparison Table --> <div class="comparison-table-wrapper" data-astro-cid-onzwjtds> <div class="comparison-table" data-astro-cid-onzwjtds> <div class="table-header" data-astro-cid-onzwjtds> <div class="header-cell" data-astro-cid-onzwjtds>Tool</div> <div class="header-cell" data-astro-cid-onzwjtds>Pricing</div> <div class="header-cell" data-astro-cid-onzwjtds>Rating</div> <div class="header-cell" data-astro-cid-onzwjtds>Features</div> <div class="header-cell" data-astro-cid-onzwjtds>Best For</div> <div class="header-cell" data-astro-cid-onzwjtds>Actions</div> </div> <div class="table-body" id="table-body" data-astro-cid-onzwjtds> ', ' </div> </div> </div> <div class="results-summary" data-astro-cid-onzwjtds> <span data-astro-cid-onzwjtds>Showing <span id="results-count" data-astro-cid-onzwjtds>', "</span> AI tools</span> </div> </div> </section>  <script>(function(){", `
document.addEventListener('DOMContentLoaded', function() {
  const tools = toolsData;
  let filteredTools = [...tools];
  let selectedForComparison = [];
  
  function applyFilters() {
    const category = document.getElementById('category-filter').value;
    const subcategory = document.getElementById('subcategory-filter').value;
    const priceRange = document.getElementById('price-filter').value;
    const search = document.getElementById('search-input').value.toLowerCase();
    const sort = document.getElementById('sort-select').value;
    
    filteredTools = tools.filter(tool => {
      if (category !== 'all' && tool.category !== category) return false;
      if (subcategory !== 'all' && tool.subcategory !== subcategory) return false;
      
      // Price range filtering
      if (priceRange !== 'all') {
        const hasStarter = tool.pricing.starter;
        const starterPrice = hasStarter ? parseInt(hasStarter.toString()) : 0;
        
        switch(priceRange) {
          case 'free':
            if (!tool.pricing.free) return false;
            break;
          case 'under-50':
            if (!hasStarter || starterPrice >= 50) return false;
            break;
          case '50-200':
            if (!hasStarter || starterPrice < 50 || starterPrice > 200) return false;
            break;
          case 'over-200':
            if (!hasStarter || starterPrice <= 200) return false;
            break;
        }
      }
      
      if (search && !tool.name.toLowerCase().includes(search) && 
          !tool.description.toLowerCase().includes(search)) return false;
      return true;
    });
    
    filteredTools.sort((a, b) => {
      switch(sort) {
        case 'rating': 
          return b.rating - a.rating;
        case 'price-low': 
          const priceA = a.pricing.starter || (a.pricing.free ? 0 : 999);
          const priceB = b.pricing.starter || (b.pricing.free ? 0 : 999);
          return priceA - priceB;
        case 'price-high':
          const priceHighA = a.pricing.starter || (a.pricing.free ? 0 : 999);
          const priceHighB = b.pricing.starter || (b.pricing.free ? 0 : 999);
          return priceHighB - priceHighA;
        case 'name': 
          return a.name.localeCompare(b.name);
        case 'popularity':
        default: 
          return b.popularity - a.popularity;
      }
    });
    
    renderTable();
  }
  
  function renderTable() {
    const tableBody = document.getElementById('table-body');
    const allRows = Array.from(document.querySelectorAll('.tool-row'));
    
    // Hide all rows first
    allRows.forEach(row => row.classList.add('hidden'));
    
    // Reorder and show filtered tools in the correct order
    filteredTools.forEach((tool, index) => {
      const row = allRows.find(r => r.dataset.toolId === tool.id);
      if (row) {
        row.classList.remove('hidden');
        // Move the row to the correct position
        tableBody.appendChild(row);
      }
    });
    
    document.getElementById('results-count').textContent = filteredTools.length;
  }
  
  document.getElementById('category-filter').addEventListener('change', applyFilters);
  document.getElementById('subcategory-filter').addEventListener('change', applyFilters);
  document.getElementById('price-filter').addEventListener('change', applyFilters);
  document.getElementById('sort-select').addEventListener('change', applyFilters);
  document.getElementById('search-input').addEventListener('input', applyFilters);
  
  document.getElementById('clear-filters').addEventListener('click', () => {
    document.getElementById('category-filter').value = 'all';
    document.getElementById('subcategory-filter').value = 'all';
    document.getElementById('price-filter').value = 'all';
    document.getElementById('search-input').value = '';
    document.getElementById('sort-select').value = 'popularity';
    applyFilters();
  });
  
  // Compare functionality
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('compare-btn')) {
      const toolId = e.target.dataset.toolId;
      const button = e.target;
      
      if (selectedForComparison.includes(toolId)) {
        // Remove from comparison
        selectedForComparison = selectedForComparison.filter(id => id !== toolId);
        button.textContent = 'Compare';
        button.classList.remove('selected');
      } else {
        // Add to comparison (max 3 tools)
        if (selectedForComparison.length < 3) {
          selectedForComparison.push(toolId);
          button.textContent = 'Selected';
          button.classList.add('selected');
        } else {
          alert('You can compare up to 3 tools at once. Remove one to add another.');
        }
      }
      
      updateCompareStatus();
    }
  });
  
  function updateCompareStatus() {
    // Update compare status display
    let statusDiv = document.getElementById('compare-status');
    if (!statusDiv && selectedForComparison.length > 0) {
      statusDiv = document.createElement('div');
      statusDiv.id = 'compare-status';
      statusDiv.className = 'compare-status';
      document.querySelector('.comparison-controls').appendChild(statusDiv);
    }
    
    if (selectedForComparison.length > 0) {
      const selectedTools = tools.filter(t => selectedForComparison.includes(t.id));
      statusDiv.innerHTML = \`
        <div class="compare-info">
          <span>Selected for comparison: \${selectedTools.map(t => t.name).join(', ')}</span>
          <button class="clear-selection">Clear Selection</button>
        </div>
      \`;
      
      statusDiv.querySelector('.clear-selection').addEventListener('click', () => {
        selectedForComparison = [];
        document.querySelectorAll('.compare-btn').forEach(btn => {
          btn.textContent = 'Compare';
          btn.classList.remove('selected');
        });
        statusDiv.remove();
      });
    } else if (statusDiv) {
      statusDiv.remove();
    }
  }
});
})();<\/script>`], ["", '<section class="tools-comparison-section" data-astro-cid-onzwjtds> <div class="comparison-container" data-astro-cid-onzwjtds> <div class="comparison-header" data-astro-cid-onzwjtds> <h2 class="comparison-title" data-astro-cid-onzwjtds>Best AI Tools for Entrepreneurs</h2> <p class="comparison-subtitle" data-astro-cid-onzwjtds>Discover the AI tools that will accelerate your business growth and success</p> </div> <!-- Filters and Controls --> <div class="comparison-controls" data-astro-cid-onzwjtds> <div class="filters-row" data-astro-cid-onzwjtds> <select id="category-filter" class="filter-select" data-astro-cid-onzwjtds> ', ' </select> <select id="subcategory-filter" class="filter-select" data-astro-cid-onzwjtds> ', ' </select> <select id="price-filter" class="filter-select" data-astro-cid-onzwjtds> ', ' </select> <select id="sort-select" class="filter-select" data-astro-cid-onzwjtds> ', ' </select> </div> <div class="search-row" data-astro-cid-onzwjtds> <input type="text" id="search-input" placeholder="Search tools..." class="search-input" data-astro-cid-onzwjtds> <button id="clear-filters" class="clear-button" data-astro-cid-onzwjtds>Clear</button> </div> </div> <!-- Comparison Table --> <div class="comparison-table-wrapper" data-astro-cid-onzwjtds> <div class="comparison-table" data-astro-cid-onzwjtds> <div class="table-header" data-astro-cid-onzwjtds> <div class="header-cell" data-astro-cid-onzwjtds>Tool</div> <div class="header-cell" data-astro-cid-onzwjtds>Pricing</div> <div class="header-cell" data-astro-cid-onzwjtds>Rating</div> <div class="header-cell" data-astro-cid-onzwjtds>Features</div> <div class="header-cell" data-astro-cid-onzwjtds>Best For</div> <div class="header-cell" data-astro-cid-onzwjtds>Actions</div> </div> <div class="table-body" id="table-body" data-astro-cid-onzwjtds> ', ' </div> </div> </div> <div class="results-summary" data-astro-cid-onzwjtds> <span data-astro-cid-onzwjtds>Showing <span id="results-count" data-astro-cid-onzwjtds>', "</span> AI tools</span> </div> </div> </section>  <script>(function(){", `
document.addEventListener('DOMContentLoaded', function() {
  const tools = toolsData;
  let filteredTools = [...tools];
  let selectedForComparison = [];
  
  function applyFilters() {
    const category = document.getElementById('category-filter').value;
    const subcategory = document.getElementById('subcategory-filter').value;
    const priceRange = document.getElementById('price-filter').value;
    const search = document.getElementById('search-input').value.toLowerCase();
    const sort = document.getElementById('sort-select').value;
    
    filteredTools = tools.filter(tool => {
      if (category !== 'all' && tool.category !== category) return false;
      if (subcategory !== 'all' && tool.subcategory !== subcategory) return false;
      
      // Price range filtering
      if (priceRange !== 'all') {
        const hasStarter = tool.pricing.starter;
        const starterPrice = hasStarter ? parseInt(hasStarter.toString()) : 0;
        
        switch(priceRange) {
          case 'free':
            if (!tool.pricing.free) return false;
            break;
          case 'under-50':
            if (!hasStarter || starterPrice >= 50) return false;
            break;
          case '50-200':
            if (!hasStarter || starterPrice < 50 || starterPrice > 200) return false;
            break;
          case 'over-200':
            if (!hasStarter || starterPrice <= 200) return false;
            break;
        }
      }
      
      if (search && !tool.name.toLowerCase().includes(search) && 
          !tool.description.toLowerCase().includes(search)) return false;
      return true;
    });
    
    filteredTools.sort((a, b) => {
      switch(sort) {
        case 'rating': 
          return b.rating - a.rating;
        case 'price-low': 
          const priceA = a.pricing.starter || (a.pricing.free ? 0 : 999);
          const priceB = b.pricing.starter || (b.pricing.free ? 0 : 999);
          return priceA - priceB;
        case 'price-high':
          const priceHighA = a.pricing.starter || (a.pricing.free ? 0 : 999);
          const priceHighB = b.pricing.starter || (b.pricing.free ? 0 : 999);
          return priceHighB - priceHighA;
        case 'name': 
          return a.name.localeCompare(b.name);
        case 'popularity':
        default: 
          return b.popularity - a.popularity;
      }
    });
    
    renderTable();
  }
  
  function renderTable() {
    const tableBody = document.getElementById('table-body');
    const allRows = Array.from(document.querySelectorAll('.tool-row'));
    
    // Hide all rows first
    allRows.forEach(row => row.classList.add('hidden'));
    
    // Reorder and show filtered tools in the correct order
    filteredTools.forEach((tool, index) => {
      const row = allRows.find(r => r.dataset.toolId === tool.id);
      if (row) {
        row.classList.remove('hidden');
        // Move the row to the correct position
        tableBody.appendChild(row);
      }
    });
    
    document.getElementById('results-count').textContent = filteredTools.length;
  }
  
  document.getElementById('category-filter').addEventListener('change', applyFilters);
  document.getElementById('subcategory-filter').addEventListener('change', applyFilters);
  document.getElementById('price-filter').addEventListener('change', applyFilters);
  document.getElementById('sort-select').addEventListener('change', applyFilters);
  document.getElementById('search-input').addEventListener('input', applyFilters);
  
  document.getElementById('clear-filters').addEventListener('click', () => {
    document.getElementById('category-filter').value = 'all';
    document.getElementById('subcategory-filter').value = 'all';
    document.getElementById('price-filter').value = 'all';
    document.getElementById('search-input').value = '';
    document.getElementById('sort-select').value = 'popularity';
    applyFilters();
  });
  
  // Compare functionality
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('compare-btn')) {
      const toolId = e.target.dataset.toolId;
      const button = e.target;
      
      if (selectedForComparison.includes(toolId)) {
        // Remove from comparison
        selectedForComparison = selectedForComparison.filter(id => id !== toolId);
        button.textContent = 'Compare';
        button.classList.remove('selected');
      } else {
        // Add to comparison (max 3 tools)
        if (selectedForComparison.length < 3) {
          selectedForComparison.push(toolId);
          button.textContent = 'Selected';
          button.classList.add('selected');
        } else {
          alert('You can compare up to 3 tools at once. Remove one to add another.');
        }
      }
      
      updateCompareStatus();
    }
  });
  
  function updateCompareStatus() {
    // Update compare status display
    let statusDiv = document.getElementById('compare-status');
    if (!statusDiv && selectedForComparison.length > 0) {
      statusDiv = document.createElement('div');
      statusDiv.id = 'compare-status';
      statusDiv.className = 'compare-status';
      document.querySelector('.comparison-controls').appendChild(statusDiv);
    }
    
    if (selectedForComparison.length > 0) {
      const selectedTools = tools.filter(t => selectedForComparison.includes(t.id));
      statusDiv.innerHTML = \\\`
        <div class="compare-info">
          <span>Selected for comparison: \\\${selectedTools.map(t => t.name).join(', ')}</span>
          <button class="clear-selection">Clear Selection</button>
        </div>
      \\\`;
      
      statusDiv.querySelector('.clear-selection').addEventListener('click', () => {
        selectedForComparison = [];
        document.querySelectorAll('.compare-btn').forEach(btn => {
          btn.textContent = 'Compare';
          btn.classList.remove('selected');
        });
        statusDiv.remove();
      });
    } else if (statusDiv) {
      statusDiv.remove();
    }
  }
});
})();<\/script>`])), maybeRenderHead(), categories.map((cat) => renderTemplate`<option${addAttribute(cat.value, "value")} data-astro-cid-onzwjtds>${cat.label}</option>`), subcategories.map((sub) => renderTemplate`<option${addAttribute(sub.value, "value")} data-astro-cid-onzwjtds>${sub.label}</option>`), priceRanges.map((price) => renderTemplate`<option${addAttribute(price.value, "value")} data-astro-cid-onzwjtds>${price.label}</option>`), sortOptions.map((sort) => renderTemplate`<option${addAttribute(sort.value, "value")} data-astro-cid-onzwjtds>${sort.label}</option>`), aiTools.map((tool) => renderTemplate`<div class="tool-row"${addAttribute(tool.category, "data-category")}${addAttribute(tool.subcategory, "data-subcategory")}${addAttribute(tool.id, "data-tool-id")} data-astro-cid-onzwjtds> <div class="cell tool-info" data-astro-cid-onzwjtds> <div class="tool-logo" data-astro-cid-onzwjtds> <div class="logo-placeholder" data-astro-cid-onzwjtds>${tool.name.charAt(0)}</div> </div> <div class="tool-details" data-astro-cid-onzwjtds> <h3 class="tool-name" data-astro-cid-onzwjtds>${tool.name}</h3> <p class="tool-description" data-astro-cid-onzwjtds>${tool.description}</p> <div class="tool-category" data-astro-cid-onzwjtds>${tool.subcategory}</div> </div> </div> <div class="cell pricing-info" data-astro-cid-onzwjtds> <div class="pricing-tiers" data-astro-cid-onzwjtds> ${tool.pricing.free && renderTemplate`<div class="price-tier free" data-astro-cid-onzwjtds>Free</div>`} ${tool.pricing.starter && renderTemplate`<div class="price-tier starter" data-astro-cid-onzwjtds>$${tool.pricing.starter}/mo</div>`} ${tool.pricing.pro && renderTemplate`<div class="price-tier pro" data-astro-cid-onzwjtds>$${tool.pricing.pro}/mo</div>`} </div> </div> <div class="cell rating-info" data-astro-cid-onzwjtds> <div class="rating-display" data-astro-cid-onzwjtds> <div class="rating-text" data-astro-cid-onzwjtds>${tool.rating}/5 ⭐</div> <div class="review-count" data-astro-cid-onzwjtds>(${tool.reviewCount} reviews)</div> </div> </div> <div class="cell features-info" data-astro-cid-onzwjtds> <div class="features-list" data-astro-cid-onzwjtds> ${tool.features.slice(0, 3).map((feature) => renderTemplate`<span class="feature-tag" data-astro-cid-onzwjtds>${feature}</span>`)} ${tool.features.length > 3 && renderTemplate`<span class="feature-more" data-astro-cid-onzwjtds>+${tool.features.length - 3} more</span>`} </div> </div> <div class="cell best-for-info" data-astro-cid-onzwjtds> <div class="best-for-list" data-astro-cid-onzwjtds> ${tool.bestFor.slice(0, 2).map((use) => renderTemplate`<span class="best-for-tag" data-astro-cid-onzwjtds>${use}</span>`)} </div> </div> <div class="cell actions-info" data-astro-cid-onzwjtds> <div class="action-buttons" data-astro-cid-onzwjtds> <a${addAttribute(tool.affiliateLink, "href")} class="action-btn primary" data-astro-cid-onzwjtds>Get Started</a> <button class="action-btn secondary compare-btn"${addAttribute(tool.id, "data-tool-id")} data-astro-cid-onzwjtds>Compare</button> </div> </div> </div>`), aiTools.length, defineScriptVars({ toolsData: aiTools }));
}, "/workspaces/ai-news-site/src/components/AIToolsComparison.astro", void 0);
const $$AiToolsComparison = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "AI Tools Comparison - Find the Best AI Tools for Your Needs", "description": "Compare the best AI tools side by side. Find the perfect AI solution for your business with our comprehensive comparison table featuring pricing, features, and reviews.", "data-astro-cid-l4xr3bsy": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="tools-page-content" data-astro-cid-l4xr3bsy> ${renderComponent($$result2, "AIToolsComparison", $$AIToolsComparison, { "data-astro-cid-l4xr3bsy": true })} <!-- SEO Content Section --> <section class="seo-content-section" data-astro-cid-l4xr3bsy> <div class="seo-container" data-astro-cid-l4xr3bsy> <div class="seo-content" data-astro-cid-l4xr3bsy> <h2 data-astro-cid-l4xr3bsy>Why Entrepreneurs Choose Our AI Tools Guide?</h2> <div class="benefits-grid" data-astro-cid-l4xr3bsy> <div class="benefit-card" data-astro-cid-l4xr3bsy> <div class="benefit-icon" data-astro-cid-l4xr3bsy>🎯</div> <h3 data-astro-cid-l4xr3bsy>Skip the Learning Curve</h3> <p data-astro-cid-l4xr3bsy>Get straight to the tools that work, without wasting time on trial and error</p> </div> <div class="benefit-card" data-astro-cid-l4xr3bsy> <div class="benefit-icon" data-astro-cid-l4xr3bsy>💰</div> <h3 data-astro-cid-l4xr3bsy>Bootstrap-Friendly</h3> <p data-astro-cid-l4xr3bsy>Find powerful tools that fit startup budgets, with free tiers highlighted</p> </div> <div class="benefit-card" data-astro-cid-l4xr3bsy> <div class="benefit-icon" data-astro-cid-l4xr3bsy>📊</div> <h3 data-astro-cid-l4xr3bsy>Real Business Impact</h3> <p data-astro-cid-l4xr3bsy>Focus on tools that actually move the needle for growing businesses</p> </div> <div class="benefit-card" data-astro-cid-l4xr3bsy> <div class="benefit-icon" data-astro-cid-l4xr3bsy>🚀</div> <h3 data-astro-cid-l4xr3bsy>Scale Your Success</h3> <p data-astro-cid-l4xr3bsy>Discover tools that grow with your business from startup to scale-up</p> </div> </div> <div class="categories-overview" data-astro-cid-l4xr3bsy> <h3 data-astro-cid-l4xr3bsy>AI Tool Categories We Cover</h3> <div class="category-list" data-astro-cid-l4xr3bsy> <div class="category-item" data-astro-cid-l4xr3bsy> <h4 data-astro-cid-l4xr3bsy>AI Marketing Tools</h4> <p data-astro-cid-l4xr3bsy>Content creation, social media management, email marketing, and SEO tools powered by AI</p> </div> <div class="category-item" data-astro-cid-l4xr3bsy> <h4 data-astro-cid-l4xr3bsy>AI Agents</h4> <p data-astro-cid-l4xr3bsy>Intelligent agents for coding, customer service, research, and business automation</p> </div> <div class="category-item" data-astro-cid-l4xr3bsy> <h4 data-astro-cid-l4xr3bsy>Automation Platforms</h4> <p data-astro-cid-l4xr3bsy>Workflow automation, integration platforms, and business process optimization tools</p> </div> </div> </div> </div> </div> </section> </main> ` })} `;
}, "/workspaces/ai-news-site/src/pages/ai-tools-comparison.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/ai-tools-comparison.astro";
const $$url = "/ai-tools-comparison";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$AiToolsComparison,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
