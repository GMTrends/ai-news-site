// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// Place your favicon and other images in `public/`
export const SITE_TITLE = 'AI Buzz Media';
export const SITE_DESCRIPTION = 'Breaking AI News, Reviews & Industry Insights - Your Source for Artificial Intelligence Updates';

export const CATEGORIES = [
  {
    slug: 'marketing',
    displayName: 'Marketing',
    fullName: 'AI Marketing & Content Creation',
    homepagePriority: 1,
  },
  {
    slug: 'business',
    displayName: 'Business',
    fullName: 'AI for Entrepreneurs & Side Hustles',
    homepagePriority: 2,
  },
  {
    slug: 'ai-agents',
    displayName: 'AI Agents',
    fullName: 'AI Agents & Autonomous Systems',
    homepagePriority: 3,
  },
  {
    slug: 'creative',
    displayName: 'Creative',
    fullName: 'AI Video & Image Generation',
    homepagePriority: 4,
  },
  {
    slug: 'ecommerce',
    displayName: 'eCommerce',
    fullName: 'AI for eCommerce & Online Business',
    homepagePriority: undefined,
  },
  {
    slug: 'coding',
    displayName: 'Coding',
    fullName: 'AI Coding & Development Tools',
    homepagePriority: undefined,
  },
];

export const HOMEPAGE_CATEGORIES = CATEGORIES
  .filter(c => c.homepagePriority)
  .sort((a, b) => (a.homepagePriority ?? 99) - (b.homepagePriority ?? 99));

