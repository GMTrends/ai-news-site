import { b as createAstro, d as createComponent, f as renderComponent, g as renderTemplate, F as Fragment, u as unescapeHTML } from "../../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { $ as $$BlogPost } from "../../chunks/BlogPost_CzGHirrA.mjs";
import { s as sanityClient, a as getImageUrl, b as getArticlesByCategory } from "../../chunks/data-vendor_CAsGKFmz.mjs";
import { r } from "../../chunks/data-vendor_CAsGKFmz.mjs";
import { $ as $$CategorySidebar } from "../../chunks/CategorySidebar_DCUU23L3.mjs";
const $$Astro = createAstro("http://localhost:4321");
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const slugParam = Array.isArray(Astro2.params.slug) ? Astro2.params.slug[Astro2.params.slug.length - 1] : Astro2.params.slug;
  const article = await sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug][0]{
		_id,
		title,
		slug,
		category->{name, slug},
		excerpt,
		content,
		featuredImage,
		publishedAt,
		author->{name, bio, image},
		tags
	}`,
    { slug: slugParam }
  );
  if (!article) {
    return Astro2.redirect("/404");
  }
  const heroImage = getImageUrl(article.featuredImage);
  const currentCategorySlug = article.category?.slug?.current;
  const relatedArticles = await getArticlesByCategory(currentCategorySlug);
  function renderContent(content) {
    if (!content || !Array.isArray(content)) return "";
    return content.map((block) => {
      if (block._type === "block") {
        let text = block.children?.map((child) => {
          let result = child.text || "";
          if (child.marks?.includes("strong")) result = `<strong>${result}</strong>`;
          if (child.marks?.includes("em")) result = `<em>${result}</em>`;
          if (child.marks?.includes("code")) result = `<code>${result}</code>`;
          return result;
        }).join("") || "";
        const style = block.style || "normal";
        if (style === "h2") return `<h2>${text}</h2>`;
        if (style === "h3") return `<h3>${text}</h3>`;
        if (style === "h4") return `<h4>${text}</h4>`;
        if (style === "blockquote") return `<blockquote>${text}</blockquote>`;
        return `<p>${text}</p>`;
      } else if (block._type === "image") {
        const alt = block.alt || "";
        const caption = block.caption ? `<figcaption>${block.caption}</figcaption>` : "";
        return `<figure><img src="${block.asset?.url || ""}" alt="${alt}" />${caption}</figure>`;
      }
      return "";
    }).join("");
  }
  const articleContent = renderContent(article.content);
  return renderTemplate`${renderComponent($$result, "BlogPost", $$BlogPost, { "title": article.title, "description": article.excerpt, "pubDate": article.publishedAt, "heroImage": heroImage }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${unescapeHTML(articleContent)}` })}  `, "sidebar": async ($$result2) => renderTemplate`${renderComponent($$result2, "CategorySidebar", $$CategorySidebar, { "categorySlug": article.category?.slug?.current, "currentArticleSlug": article.slug?.current, "articles": relatedArticles, "slot": "sidebar" })}` })}`;
}, "/workspaces/ai-news-site/src/pages/blog/[...slug].astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
