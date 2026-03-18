import { b as createAstro, d as createComponent, f as renderComponent, g as renderTemplate, h as defineScriptVars, e as addAttribute, m as maybeRenderHead } from "./vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { $ as $$MainLayout } from "./MainLayout_DdYH-KlJ.mjs";
import { $ as $$CategoryHero } from "./CategoryHero_GIdsrjsN.mjs";
import { $ as $$CategorySidebar } from "./CategorySidebar_DCUU23L3.mjs";
/* empty css                             */
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("http://localhost:4321");
const $$CategoryLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CategoryLayout;
  const {
    title,
    description,
    keywords = "",
    image,
    canonicalUrl,
    categorySlug,
    categoryData,
    allArticles,
    initialArticles,
    categoryDisplayName
  } = Astro2.props;
  const hasMoreArticles = allArticles.length > initialArticles.length;
  const categorySlugForScript = categorySlug || "";
  const categoryPlaceholders = {
    "marketing": "📈",
    "creative": "🎨",
    "business": "💼",
    "ai-agents": "🤖",
    "ecommerce": "🛒",
    "productivity": "⚡"
  };
  const placeholderEmoji = categoryPlaceholders[categorySlug] || "📰";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "description": description, "type": "category", "canonicalUrl": canonicalUrl, "image": image, "data-astro-cid-5stfgk4a": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", '<main class="category-page" data-astro-cid-5stfgk4a> ', ' <div class="category-content" data-astro-cid-5stfgk4a> <div class="category-layout" data-astro-cid-5stfgk4a> <div class="category-main" data-astro-cid-5stfgk4a> <div class="articles-grid" id="articles-grid" data-astro-cid-5stfgk4a> ', ' </div> </div> <div class="sidebar sticky-col" data-astro-cid-5stfgk4a> ', " </div> </div> ", " </div> </main> <script>(function(){", `
    document.addEventListener('DOMContentLoaded', function() {
      const articlesGrid = document.getElementById('articles-grid');
      const loadMoreBtn = document.getElementById('load-more-btn');
      const allArticlesArray = typeof allArticles === 'string' ? JSON.parse(allArticles) : allArticles;
      
      if (!articlesGrid || !loadMoreBtn || !allArticlesArray || allArticlesArray.length <= 8) {
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
      }

      let currentPage = 0;
      const articlesPerPage = 8;

      function loadMoreArticles() {
        if (loadMoreBtn.disabled) return;
        
        loadMoreBtn.disabled = true;
        loadMoreBtn.innerHTML = '<span class="load-more-text">Loading...</span>';
        
        setTimeout(() => {
          const startIndex = (currentPage + 1) * articlesPerPage;
          const endIndex = Math.min(startIndex + articlesPerPage, allArticlesArray.length);
          const articlesToAdd = allArticlesArray.slice(startIndex, endIndex);
          
          articlesToAdd.forEach((article, idx) => {
            const articleIndex = startIndex + idx;
            const articleEl = document.createElement('article');
            articleEl.className = 'category-article fade-in';
            articleEl.setAttribute('data-article-index', articleIndex.toString());
            
            const articleUrl = \`/\${categorySlug}/\${article.slug}\`;
            const authorSlug = typeof article.author?.slug === 'object' ? article.author.slug.current : article.author?.slug || 'anonymous';
            const authorName = article.author?.name || 'Anonymous';
            const publishedDate = new Date(article.publishedAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            
            articleEl.innerHTML = \`
              <div class="article-image">
                \${article.featuredImage ? 
                  \`<img src="\${article.featuredImage}" alt="\${article.title}" width="400" height="240" loading="lazy" decoding="async" />\` : 
                  \`<div class="placeholder">📈</div>\`
                }
              </div>
              <div class="article-content">
                <a href="/categories/\${categorySlug}" class="category-badge-small \${categorySlug}">\${categoryDisplayName}</a>
                <h2><a href="\${articleUrl}">\${article.title}</a></h2>
                <p>\${article.excerpt || ''}</p>
                <div class="article-meta">
                  <span class="author">By <a href="/authors/\${authorSlug}" class="author-link">\${authorName}</a></span>
                  <span class="date">\${publishedDate}</span>
                </div>
              </div>
            \`;
            
            articlesGrid.appendChild(articleEl);
            
            const authorLink = articleEl.querySelector('.author-link');
            if (authorLink) {
              authorLink.addEventListener('mouseenter', function() {
                this.style.color = '#00d4ff';
                this.style.transform = 'translateY(-2px)';
              });
              
              authorLink.addEventListener('mouseleave', function() {
                this.style.color = '#888888';
                this.style.transform = 'translateY(0)';
              });
              
              authorLink.addEventListener('focus', function() {
                this.style.outline = '2px solid #00d4ff';
                this.style.outlineOffset = '2px';
                this.style.background = 'rgba(0, 212, 255, 0.1)';
              });
              
              authorLink.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
                this.style.background = '';
              });
            }
          });
          
          currentPage++;
          
          const remainingArticles = allArticlesArray.length - ((currentPage + 1) * articlesPerPage);
          
          if (remainingArticles <= 0) {
            loadMoreBtn.style.display = 'none';
          } else {
            loadMoreBtn.innerHTML = '<span class="load-more-text">Load More Articles</span>';
            loadMoreBtn.disabled = false;
          }
          
          setTimeout(() => {
            updateSidebarAlignment();
          }, 100);
          
          setTimeout(() => {
            updateSidebarAlignment();
          }, 600);
        }, 500);
      }
      
      function updateSidebarAlignment() {
        const sidebar = document.querySelector('.sidebar.sticky-col');
        const categoryMain = document.querySelector('.category-main');
        const categoryLayout = document.querySelector('.category-layout');
        const articlesGrid = document.getElementById('articles-grid');
        
        if (sidebar && categoryMain && categoryLayout && articlesGrid) {
          if (sidebar.style.minHeight) {
            sidebar.style.minHeight = '';
          }

          const sidebarContent = sidebar.querySelector('.category-sidebar');
          if (sidebarContent && sidebarContent.style.minHeight) {
            sidebarContent.style.minHeight = '';
          }
        }
      }
      
      setTimeout(updateSidebarAlignment, 100);
      window.addEventListener('resize', updateSidebarAlignment);
      
      const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            const addedElements = Array.from(mutation.addedNodes);
            if (addedElements.some((node) => node.classList && node.classList.contains('category-article'))) {
              shouldUpdate = true;
            }
          }
        });
        
        if (shouldUpdate) {
          setTimeout(updateSidebarAlignment, 150);
        }
      });
      
      if (articlesGrid) {
        observer.observe(articlesGrid, {
          childList: true,
          subtree: true
        });
      }
      
      if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function(e) {
          loadMoreArticles();
        });
      }
    });
  })();<\/script>  `], [" ", '<main class="category-page" data-astro-cid-5stfgk4a> ', ' <div class="category-content" data-astro-cid-5stfgk4a> <div class="category-layout" data-astro-cid-5stfgk4a> <div class="category-main" data-astro-cid-5stfgk4a> <div class="articles-grid" id="articles-grid" data-astro-cid-5stfgk4a> ', ' </div> </div> <div class="sidebar sticky-col" data-astro-cid-5stfgk4a> ', " </div> </div> ", " </div> </main> <script>(function(){", `
    document.addEventListener('DOMContentLoaded', function() {
      const articlesGrid = document.getElementById('articles-grid');
      const loadMoreBtn = document.getElementById('load-more-btn');
      const allArticlesArray = typeof allArticles === 'string' ? JSON.parse(allArticles) : allArticles;
      
      if (!articlesGrid || !loadMoreBtn || !allArticlesArray || allArticlesArray.length <= 8) {
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
      }

      let currentPage = 0;
      const articlesPerPage = 8;

      function loadMoreArticles() {
        if (loadMoreBtn.disabled) return;
        
        loadMoreBtn.disabled = true;
        loadMoreBtn.innerHTML = '<span class="load-more-text">Loading...</span>';
        
        setTimeout(() => {
          const startIndex = (currentPage + 1) * articlesPerPage;
          const endIndex = Math.min(startIndex + articlesPerPage, allArticlesArray.length);
          const articlesToAdd = allArticlesArray.slice(startIndex, endIndex);
          
          articlesToAdd.forEach((article, idx) => {
            const articleIndex = startIndex + idx;
            const articleEl = document.createElement('article');
            articleEl.className = 'category-article fade-in';
            articleEl.setAttribute('data-article-index', articleIndex.toString());
            
            const articleUrl = \\\`/\\\${categorySlug}/\\\${article.slug}\\\`;
            const authorSlug = typeof article.author?.slug === 'object' ? article.author.slug.current : article.author?.slug || 'anonymous';
            const authorName = article.author?.name || 'Anonymous';
            const publishedDate = new Date(article.publishedAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            
            articleEl.innerHTML = \\\`
              <div class="article-image">
                \\\${article.featuredImage ? 
                  \\\`<img src="\\\${article.featuredImage}" alt="\\\${article.title}" width="400" height="240" loading="lazy" decoding="async" />\\\` : 
                  \\\`<div class="placeholder">📈</div>\\\`
                }
              </div>
              <div class="article-content">
                <a href="/categories/\\\${categorySlug}" class="category-badge-small \\\${categorySlug}">\\\${categoryDisplayName}</a>
                <h2><a href="\\\${articleUrl}">\\\${article.title}</a></h2>
                <p>\\\${article.excerpt || ''}</p>
                <div class="article-meta">
                  <span class="author">By <a href="/authors/\\\${authorSlug}" class="author-link">\\\${authorName}</a></span>
                  <span class="date">\\\${publishedDate}</span>
                </div>
              </div>
            \\\`;
            
            articlesGrid.appendChild(articleEl);
            
            const authorLink = articleEl.querySelector('.author-link');
            if (authorLink) {
              authorLink.addEventListener('mouseenter', function() {
                this.style.color = '#00d4ff';
                this.style.transform = 'translateY(-2px)';
              });
              
              authorLink.addEventListener('mouseleave', function() {
                this.style.color = '#888888';
                this.style.transform = 'translateY(0)';
              });
              
              authorLink.addEventListener('focus', function() {
                this.style.outline = '2px solid #00d4ff';
                this.style.outlineOffset = '2px';
                this.style.background = 'rgba(0, 212, 255, 0.1)';
              });
              
              authorLink.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
                this.style.background = '';
              });
            }
          });
          
          currentPage++;
          
          const remainingArticles = allArticlesArray.length - ((currentPage + 1) * articlesPerPage);
          
          if (remainingArticles <= 0) {
            loadMoreBtn.style.display = 'none';
          } else {
            loadMoreBtn.innerHTML = '<span class="load-more-text">Load More Articles</span>';
            loadMoreBtn.disabled = false;
          }
          
          setTimeout(() => {
            updateSidebarAlignment();
          }, 100);
          
          setTimeout(() => {
            updateSidebarAlignment();
          }, 600);
        }, 500);
      }
      
      function updateSidebarAlignment() {
        const sidebar = document.querySelector('.sidebar.sticky-col');
        const categoryMain = document.querySelector('.category-main');
        const categoryLayout = document.querySelector('.category-layout');
        const articlesGrid = document.getElementById('articles-grid');
        
        if (sidebar && categoryMain && categoryLayout && articlesGrid) {
          if (sidebar.style.minHeight) {
            sidebar.style.minHeight = '';
          }

          const sidebarContent = sidebar.querySelector('.category-sidebar');
          if (sidebarContent && sidebarContent.style.minHeight) {
            sidebarContent.style.minHeight = '';
          }
        }
      }
      
      setTimeout(updateSidebarAlignment, 100);
      window.addEventListener('resize', updateSidebarAlignment);
      
      const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            const addedElements = Array.from(mutation.addedNodes);
            if (addedElements.some((node) => node.classList && node.classList.contains('category-article'))) {
              shouldUpdate = true;
            }
          }
        });
        
        if (shouldUpdate) {
          setTimeout(updateSidebarAlignment, 150);
        }
      });
      
      if (articlesGrid) {
        observer.observe(articlesGrid, {
          childList: true,
          subtree: true
        });
      }
      
      if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function(e) {
          loadMoreArticles();
        });
      }
    });
  })();<\/script>  `])), maybeRenderHead(), categoryData ? renderTemplate`${renderComponent($$result2, "CategoryHero", $$CategoryHero, { "category": categoryData.slug, "title": categoryData.title, "description": categoryData.description, "icon": categoryData.icon || "", "toolsCount": categoryData.toolsCount || 0, "lastUpdated": categoryData.lastUpdated || "", "breadcrumbs": [
    { name: "Home", url: "/" },
    { name: "Categories", url: "/categories" }
  ], "data-astro-cid-5stfgk4a": true })}` : renderTemplate`${renderComponent($$result2, "CategoryHero", $$CategoryHero, { "category": categorySlug, "title": categoryDisplayName, "description": description, "icon": "", "toolsCount": 0, "lastUpdated": "", "breadcrumbs": [
    { name: "Home", url: "/" },
    { name: "Categories", url: "/categories" }
  ], "data-astro-cid-5stfgk4a": true })}`, initialArticles.length > 0 ? initialArticles.map((article, index) => renderTemplate`<article class="category-article"${addAttribute(index, "data-article-index")} data-astro-cid-5stfgk4a> <div class="article-image" data-astro-cid-5stfgk4a> ${article.featuredImage ? renderTemplate`<img${addAttribute(article.featuredImage, "src")}${addAttribute(article.title, "alt")} width="400" height="240" loading="lazy" decoding="async" data-astro-cid-5stfgk4a>` : renderTemplate`<div class="placeholder" data-astro-cid-5stfgk4a>${placeholderEmoji}</div>`} </div> <div class="article-content" data-astro-cid-5stfgk4a> <a${addAttribute(`/categories/${categorySlug}`, "href")}${addAttribute(`category-badge-small ${categorySlug}`, "class")} data-astro-cid-5stfgk4a>${categoryDisplayName}</a> <h2 data-astro-cid-5stfgk4a><a${addAttribute(`/${categorySlug}/${article.slug}`, "href")} data-astro-cid-5stfgk4a>${article.title}</a></h2> <p data-astro-cid-5stfgk4a>${article.excerpt || ""}</p> <div class="article-meta" data-astro-cid-5stfgk4a> <span class="author" data-astro-cid-5stfgk4a>By <a${addAttribute(`/authors/${typeof article.author?.slug === "object" ? article.author.slug.current : article.author?.slug || "anonymous"}`, "href")} class="author-link" data-astro-cid-5stfgk4a>${article.author?.name || "Anonymous"}</a></span> <span class="date" data-astro-cid-5stfgk4a>${new Date(article.publishedAt || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span> </div> </div> </article>`) : renderTemplate`<div class="no-articles" data-astro-cid-5stfgk4a> <h3 data-astro-cid-5stfgk4a>No ${categoryDisplayName} Articles Found</h3> <p data-astro-cid-5stfgk4a>We're working on bringing you the latest in AI ${categoryDisplayName.toLowerCase()} tools. Check back soon!</p> </div>`, renderComponent($$result2, "CategorySidebar", $$CategorySidebar, { "categorySlug": categorySlug, "articles": allArticles, "data-astro-cid-5stfgk4a": true }), hasMoreArticles && renderTemplate`<div class="load-more-button-wrapper" data-astro-cid-5stfgk4a> <div class="load-more-container-main-content" data-astro-cid-5stfgk4a> <button id="load-more-btn" class="load-more-btn" data-astro-cid-5stfgk4a> <span class="load-more-text" data-astro-cid-5stfgk4a>Load More Articles</span> </button> </div> </div>`, defineScriptVars({ allArticles: JSON.stringify(allArticles), categoryDisplayName, categorySlug: categorySlugForScript })) })}`;
}, "/workspaces/ai-news-site/src/layouts/CategoryLayout.astro", void 0);
export {
  $$CategoryLayout as $
};
