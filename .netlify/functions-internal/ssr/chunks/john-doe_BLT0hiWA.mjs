import { d as createComponent, m as maybeRenderHead, u as unescapeHTML, g as renderTemplate } from "./vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import "clsx";
const html = '<h1 id="john-doe">John Doe</h1>\n<p>Technology enthusiast and writer.</p>';
const frontmatter = { "name": "John Doe", "slug": "john-doe", "bio": "A technology enthusiast and writer", "avatar": "/images/authors/john-doe.jpg", "social": { "twitter": "johndoe", "linkedin": "johndoe", "github": "johndoe" } };
const file = "/workspaces/ai-news-site/src/content/authors/john-doe.md";
const url = void 0;
function rawContent() {
  return "\r\n# John Doe\r\n\r\nTechnology enthusiast and writer. ";
}
function compiledContent() {
  return html;
}
function getHeadings() {
  return [{ "depth": 1, "slug": "john-doe", "text": "John Doe" }];
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
