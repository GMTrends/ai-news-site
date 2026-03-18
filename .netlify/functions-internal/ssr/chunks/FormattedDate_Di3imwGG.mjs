import { b as createAstro, d as createComponent, m as maybeRenderHead, e as addAttribute, g as renderTemplate } from "./vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import "clsx";
const $$Astro = createAstro("http://localhost:4321");
const $$FormattedDate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<time${addAttribute(date.toISOString(), "datetime")}> ${date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })} </time>`;
}, "/workspaces/ai-news-site/src/components/FormattedDate.astro", void 0);
export {
  $$FormattedDate as $
};
