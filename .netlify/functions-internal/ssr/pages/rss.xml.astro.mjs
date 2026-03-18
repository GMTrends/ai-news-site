import rss from "@astrojs/rss";
import { g as getCollection, f as ensureExcerpt } from "../chunks/data-vendor_CAsGKFmz.mjs";
import { r } from "../chunks/data-vendor_CAsGKFmz.mjs";
import { a as SITE_DESCRIPTION, S as SITE_TITLE } from "../chunks/consts_Dxuyllhi.mjs";
async function GET(context) {
  const articles = await getCollection("articles");
  const publishedArticles = articles.filter((article) => article.data.status === "published");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: publishedArticles.map((article) => ({
      title: article.data.title,
      description: ensureExcerpt({
        excerpt: article.data.excerpt,
        body: article.data.content,
        content: article.data.content
      }, 250),
      pubDate: article.data.publishedAt ? new Date(article.data.publishedAt) : /* @__PURE__ */ new Date(),
      link: `/articles/${article.slug}/`
    }))
  });
}
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
