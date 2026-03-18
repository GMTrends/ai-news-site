import { d as createComponent, m as maybeRenderHead, u as unescapeHTML, g as renderTemplate } from "./vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import "clsx";
const html = '<h1 id="ai-agents--automation">AI Agents &#x26; Automation</h1>\n<p>Autonomous AI agents and automation systems.</p>';
const frontmatter = { "name": "AI Agents", "slug": "ai-agents", "description": "Autonomous AI agents and automation systems", "image": "/images/categories/ai-agents.jpg", "icon": "🤖", "color": "teal" };
const file = "/workspaces/ai-news-site/src/content/categories/ai-agents.md";
const url = void 0;
function rawContent() {
  return "\r\n# AI Agents & Automation\r\n\r\nAutonomous AI agents and automation systems. ";
}
function compiledContent() {
  return html;
}
function getHeadings() {
  return [{ "depth": 1, "slug": "ai-agents--automation", "text": "AI Agents & Automation" }];
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
