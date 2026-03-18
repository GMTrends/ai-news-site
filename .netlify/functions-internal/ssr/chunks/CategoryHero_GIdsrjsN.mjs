import { b as createAstro, d as createComponent, m as maybeRenderHead, e as addAttribute, g as renderTemplate } from "./vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import "clsx";
/* empty css                             */
const $$Astro = createAstro("http://localhost:4321");
const $$CategoryHero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CategoryHero;
  const {
    category,
    title,
    description,
    icon,
    toolsCount,
    lastUpdated = "Weekly",
    breadcrumbs = [
      { name: "Home", url: "/" },
      { name: "Categories", url: "/categories" }
    ]
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="category-hero" data-astro-cid-vnmiil5a> <div class="container" data-astro-cid-vnmiil5a> <!-- Breadcrumb Navigation --> <nav class="breadcrumb" aria-label="Breadcrumb" data-astro-cid-vnmiil5a> <ol class="breadcrumb-list" data-astro-cid-vnmiil5a> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="breadcrumb-item" data-astro-cid-vnmiil5a> <a${addAttribute(crumb.url, "href")} class="breadcrumb-link" data-astro-cid-vnmiil5a>${crumb.name}</a> ${index < breadcrumbs.length && renderTemplate`<span class="breadcrumb-separator" data-astro-cid-vnmiil5a>›</span>`} </li>`)} <li class="breadcrumb-item current" aria-current="page" data-astro-cid-vnmiil5a> <span class="breadcrumb-current" data-astro-cid-vnmiil5a>${title}</span> </li> </ol> </nav> <!-- Enhanced Category Header --> <div class="category-header" data-astro-cid-vnmiil5a> <div class="category-visual" data-astro-cid-vnmiil5a> <div class="category-icon-large" data-astro-cid-vnmiil5a> <span class="icon" data-astro-cid-vnmiil5a>${icon}</span> <div class="icon-glow" data-astro-cid-vnmiil5a></div> </div> <div class="category-illustration" data-astro-cid-vnmiil5a> <!-- Subtle background pattern --> <div class="pattern-dots" data-astro-cid-vnmiil5a></div> </div> </div> <div class="category-info" data-astro-cid-vnmiil5a> <h1 class="category-title" data-astro-cid-vnmiil5a>${title}</h1> <p class="category-description" data-astro-cid-vnmiil5a>${description}</p> <!-- Quick Stats --> <div class="category-stats" data-astro-cid-vnmiil5a> <div class="stat-item" data-astro-cid-vnmiil5a> <span class="stat-icon" data-astro-cid-vnmiil5a>🔧</span> <span class="stat-text" data-astro-cid-vnmiil5a>${toolsCount}+ tools reviewed</span> </div> <div class="stat-item" data-astro-cid-vnmiil5a> <span class="stat-icon" data-astro-cid-vnmiil5a>🔄</span> <span class="stat-text" data-astro-cid-vnmiil5a>Updated ${lastUpdated}</span> </div> <div class="stat-item" data-astro-cid-vnmiil5a> <span class="stat-icon" data-astro-cid-vnmiil5a>⭐</span> <span class="stat-text" data-astro-cid-vnmiil5a>Expert curated</span> </div> </div> </div> </div> </div> </section> `;
}, "/workspaces/ai-news-site/src/components/CategoryHero.astro", void 0);
export {
  $$CategoryHero as $
};
