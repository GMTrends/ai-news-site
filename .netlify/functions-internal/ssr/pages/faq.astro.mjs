import { d as createComponent, n as sanityClient, f as renderComponent, g as renderTemplate, m as maybeRenderHead, e as addAttribute, u as unescapeHTML } from "../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { $ as $$BlogPost } from "../chunks/BlogPost_CzGHirrA.mjs";
/* empty css                               */
import { r } from "../chunks/data-vendor_CAsGKFmz.mjs";
const $$Faq = createComponent(async ($$result, $$props, $$slots) => {
  const faqs = await sanityClient.fetch(`
  *[_type == "faq" && isPublished == true] | order(priority desc, _createdAt asc) {
    _id,
    question,
    answer,
    category,
    priority,
    tags,
    helpfulCount,
    relatedArticles[]-> {
      title,
      slug
    }
  }
`);
  function blockContentToHTML(blocks) {
    if (!blocks || !Array.isArray(blocks)) return "";
    return blocks.map((block) => {
      if (block._type === "block" && block.children) {
        const textContent = block.children.map((child) => {
          let text = child.text || "";
          if (child.marks && child.marks.length > 0) {
            child.marks.forEach((mark) => {
              if (mark === "strong") {
                text = `<strong>${text}</strong>`;
              } else if (mark === "em") {
                text = `<em>${text}</em>`;
              }
            });
          }
          return text;
        }).join("");
        let formattedText = textContent.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/\n•\s/g, "\n<li>").replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>");
        if (block.listItem === "bullet") {
          return `<li>${formattedText}</li>`;
        }
        if (block.style === "normal") {
          if (formattedText.includes("<li>")) {
            const parts = formattedText.split("\n<li>");
            const firstPart = parts[0];
            const listItems = parts.slice(1).map((item) => `<li>${item}</li>`).join("");
            return `<p>${firstPart}</p><ul>${listItems}</ul>`;
          }
          return `<p>${formattedText}</p>`;
        } else if (block.style && block.style.startsWith("h")) {
          const level = block.style.charAt(1);
          return `<h${level}>${formattedText}</h${level}>`;
        }
        return `<p>${formattedText}</p>`;
      }
      return "";
    }).join("");
  }
  function toCamelCase(str) {
    return str.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
  }
  const faqsByCategory = faqs.reduce((acc, faq) => {
    const category = faq.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {});
  return renderTemplate`${renderComponent($$result, "Layout", $$BlogPost, { "title": "Frequently Asked Questions", "description": "Find answers to common questions about AI tools, automation, and our services.", "pubDate": /* @__PURE__ */ new Date(), "data-astro-cid-6kmwghhu": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="faq-container" data-astro-cid-6kmwghhu> <div class="faq-intro" data-astro-cid-6kmwghhu> <h1 data-astro-cid-6kmwghhu>Frequently Asked Questions</h1> <p data-astro-cid-6kmwghhu>Find answers to the most common questions about AI tools, automation, and our services. Can't find what you're looking for? <a href="/contact" data-astro-cid-6kmwghhu>Contact us</a> for more help.</p> </div> <!-- FAQ Search --> <div class="faq-search" data-astro-cid-6kmwghhu> <input type="text" id="faqSearch" placeholder="Search FAQs..." class="search-input" data-astro-cid-6kmwghhu> </div> <!-- FAQ Categories --> <div class="faq-categories" data-astro-cid-6kmwghhu> ${Object.entries(faqsByCategory).map(([category, categoryFaqs]) => renderTemplate`<div class="category-section"${addAttribute(category.toLowerCase(), "data-category")} data-astro-cid-6kmwghhu> <h2 class="category-title" data-astro-cid-6kmwghhu>${toCamelCase(category)}</h2> <div class="faq-list" data-astro-cid-6kmwghhu> ${categoryFaqs.map((faq, index) => renderTemplate`<div class="faq-item"${addAttribute(faq.question.toLowerCase(), "data-question")} data-astro-cid-6kmwghhu> <button class="faq-question" type="button" data-astro-cid-6kmwghhu> <span class="question-text" data-astro-cid-6kmwghhu>${faq.question}</span> <span class="toggle-icon" data-astro-cid-6kmwghhu>+</span> </button> <div class="faq-answer" data-astro-cid-6kmwghhu> <div class="answer-content" data-astro-cid-6kmwghhu> <div data-astro-cid-6kmwghhu>${unescapeHTML(blockContentToHTML(faq.answer))}</div> ${faq.relatedArticles && faq.relatedArticles.length > 0 && renderTemplate`<div class="related-articles" data-astro-cid-6kmwghhu> <h4 data-astro-cid-6kmwghhu>Related Articles:</h4> <ul data-astro-cid-6kmwghhu> ${faq.relatedArticles.map((article) => renderTemplate`<li data-astro-cid-6kmwghhu> <a${addAttribute(`/blog/${article.slug.current}`, "href")} data-astro-cid-6kmwghhu> ${article.title} </a> </li>`)} </ul> </div>`} <div class="faq-actions" data-astro-cid-6kmwghhu> <div class="helpful-section" data-astro-cid-6kmwghhu> <span data-astro-cid-6kmwghhu>Was this helpful?</span> <button class="helpful-btn"${addAttribute(faq._id, "data-faq-id")} data-action="yes" data-astro-cid-6kmwghhu>
👍 Yes
</button> <button class="helpful-btn"${addAttribute(faq._id, "data-faq-id")} data-action="no" data-astro-cid-6kmwghhu>
👎 No
</button> ${faq.helpfulCount > 0 && renderTemplate`<span class="helpful-count" data-astro-cid-6kmwghhu>(${faq.helpfulCount} found this helpful)</span>`} </div> </div> </div> </div> </div>`)} </div> </div>`)} </div> ${Object.keys(faqsByCategory).length === 0 && renderTemplate`<div class="no-faqs" data-astro-cid-6kmwghhu> <h2 data-astro-cid-6kmwghhu>No FAQs available yet</h2> <p data-astro-cid-6kmwghhu>We're working on adding helpful FAQs. Please check back soon or <a href="/contact" data-astro-cid-6kmwghhu>contact us</a> with your questions.</p> </div>`} </div> ` })}  `;
}, "/workspaces/ai-news-site/src/pages/faq.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/faq.astro";
const $$url = "/faq";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Faq,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
