const SITE_TITLE = "AI Buzz Media";
const SITE_DESCRIPTION = "Breaking AI News, Reviews & Industry Insights - Your Source for Artificial Intelligence Updates";
const CATEGORIES = [
  {
    slug: "marketing",
    displayName: "Marketing",
    fullName: "AI Marketing & Content Creation",
    homepagePriority: 1
  },
  {
    slug: "business",
    displayName: "Business",
    fullName: "AI for Entrepreneurs & Side Hustles",
    homepagePriority: 2
  },
  {
    slug: "productivity",
    displayName: "Productivity",
    fullName: "AI Productivity & Automation",
    homepagePriority: 3
  },
  {
    slug: "ecommerce",
    displayName: "eCommerce",
    fullName: "AI for eCommerce & Online Business",
    homepagePriority: 4
  },
  {
    slug: "ai-agents",
    displayName: "AI Agents",
    fullName: "AI Agents & Autonomous Systems",
    homepagePriority: 5
  },
  {
    slug: "creative",
    displayName: "Creative",
    fullName: "AI Video & Image Generation",
    homepagePriority: 6
  }
];
const HOMEPAGE_CATEGORIES = CATEGORIES.filter((c) => c.homepagePriority).sort((a, b) => (a.homepagePriority ?? 99) - (b.homepagePriority ?? 99));
export {
  CATEGORIES as C,
  HOMEPAGE_CATEGORIES as H,
  SITE_TITLE as S,
  SITE_DESCRIPTION as a
};
