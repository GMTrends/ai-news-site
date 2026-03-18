import { d as createComponent, m as maybeRenderHead, u as unescapeHTML, g as renderTemplate } from "./vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import "clsx";
const html = '<h1 id="ai-business--industry">AI Business &#x26; Industry</h1>\n<p>AI business applications, industry insights, and enterprise AI solutions.</p>';
const frontmatter = { "name": "Business", "slug": "business", "description": "AI business applications, industry insights, and enterprise AI solutions", "image": "/images/categories/business.jpg", "icon": "💼", "color": "green" };
const file = "/workspaces/ai-news-site/src/content/categories/business.md";
const url = void 0;
function rawContent() {
  return "\r\n# AI Business & Industry\r\n\r\nAI business applications, industry insights, and enterprise AI solutions. ";
}
function compiledContent() {
  return html;
}
function getHeadings() {
  return [{ "depth": 1, "slug": "ai-business--industry", "text": "AI Business & Industry" }];
}
const Content = createComponent((result, _props, slots) => {
  const { layout, ...content } = frontmatter;
  content.file = file;
  content.url = url;
  return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
});
export {
  Content,
  compiledContent,
  Content as default,
  file,
  frontmatter,
  getHeadings,
  rawContent,
  url
};
