import { d as createComponent, m as maybeRenderHead, u as unescapeHTML, g as renderTemplate } from "./vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import "clsx";
const html = "<p>AI entrepreneur and business strategist helping others build profitable AI-powered businesses. Expert in AI automation, productivity tools, and scaling digital ventures.</p>\n<p>Raf specializes in identifying breakthrough AI opportunities and teaching entrepreneurs how to leverage artificial intelligence to create multiple income streams. With extensive experience in business automation and digital marketing, he helps others transform their businesses using cutting-edge AI tools and strategies.</p>";
const frontmatter = { "name": "Raf Velazquez", "slug": "raf-velazquez", "bio": "AI entrepreneur and business strategist helping others build profitable AI-powered businesses. Expert in AI automation, productivity tools, and scaling digital ventures.", "avatar": "/images/authors/raf-velazquez.jpg", "social": { "twitter": "rafvelazquez", "linkedin": "raf-velazquez", "github": "rafvelazquez" } };
const file = "/workspaces/ai-news-site/src/content/authors/raf-velazquez.md";
const url = void 0;
function rawContent() {
  return "\r\nAI entrepreneur and business strategist helping others build profitable AI-powered businesses. Expert in AI automation, productivity tools, and scaling digital ventures.\r\n\r\nRaf specializes in identifying breakthrough AI opportunities and teaching entrepreneurs how to leverage artificial intelligence to create multiple income streams. With extensive experience in business automation and digital marketing, he helps others transform their businesses using cutting-edge AI tools and strategies.\r\n";
}
function compiledContent() {
  return html;
}
function getHeadings() {
  return [];
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
