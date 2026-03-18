import { d as createComponent, f as renderComponent, r as renderHead, g as renderTemplate } from "../../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { $ as $$BaseHead } from "../../chunks/BaseHead_DlYNO4qP.mjs";
import { $ as $$HeaderPremium } from "../../chunks/HeaderPremium_DLonACPk.mjs";
import { $ as $$Footer } from "../../chunks/Footer_FSuDz8wK.mjs";
import { S as SITE_TITLE } from "../../chunks/consts_Dxuyllhi.mjs";
/* empty css                                        */
import { r } from "../../chunks/data-vendor_CAsGKFmz.mjs";
const $$Analytics = createComponent(async ($$result, $$props, $$slots) => {
  const pageTitle = `Analytics Dashboard - ${SITE_TITLE}`;
  const description = "Real-time insights from Google Analytics";
  return renderTemplate`<html lang="en" data-astro-cid-5a6mzon6> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": pageTitle, "description": description, "image": "/assets/blog-placeholder-1.jpg", "data-astro-cid-5a6mzon6": true })}${renderHead()}</head> <body data-astro-cid-5a6mzon6> ${renderComponent($$result, "HeaderPremium", $$HeaderPremium, { "data-astro-cid-5a6mzon6": true })} <main class="admin-page" data-astro-cid-5a6mzon6> <div class="admin-container" data-astro-cid-5a6mzon6> <div class="admin-card" data-astro-cid-5a6mzon6> <div class="admin-header" data-astro-cid-5a6mzon6> <h1 class="admin-title" data-astro-cid-5a6mzon6>📊 Analytics Dashboard</h1> <p class="admin-subtitle" data-astro-cid-5a6mzon6>Real-time insights from Google Analytics</p> </div> <!-- Back to Admin --> <div class="back-section" data-astro-cid-5a6mzon6> <a href="/admin" class="back-link" data-astro-cid-5a6mzon6>← Back to Admin Dashboard</a> </div> <!-- Analytics Dashboard --> <div class="analytics-dashboard" data-astro-cid-5a6mzon6> <!-- Key Metrics Cards --> <div class="metrics-grid" data-astro-cid-5a6mzon6> <div class="metric-card" data-astro-cid-5a6mzon6> <div class="metric-icon" data-astro-cid-5a6mzon6>👥</div> <div class="metric-content" data-astro-cid-5a6mzon6> <h3 data-astro-cid-5a6mzon6>Total Page Views</h3> <div class="metric-value" id="totalViews" data-astro-cid-5a6mzon6>Loading...</div> <div class="metric-period" data-astro-cid-5a6mzon6>Last 30 days</div> </div> </div> <div class="metric-card" data-astro-cid-5a6mzon6> <div class="metric-icon" data-astro-cid-5a6mzon6>🆔</div> <div class="metric-content" data-astro-cid-5a6mzon6> <h3 data-astro-cid-5a6mzon6>Unique Visitors</h3> <div class="metric-value" id="uniqueVisitors" data-astro-cid-5a6mzon6>Loading...</div> <div class="metric-period" data-astro-cid-5a6mzon6>Last 30 days</div> </div> </div> <div class="metric-card" data-astro-cid-5a6mzon6> <div class="metric-icon" data-astro-cid-5a6mzon6>📈</div> <div class="metric-content" data-astro-cid-5a6mzon6> <h3 data-astro-cid-5a6mzon6>Engagement Rate</h3> <div class="metric-value" id="engagementRate" data-astro-cid-5a6mzon6>Loading...</div> <div class="metric-period" data-astro-cid-5a6mzon6>Last 30 days</div> </div> </div> <div class="metric-card" data-astro-cid-5a6mzon6> <div class="metric-icon" data-astro-cid-5a6mzon6>📚</div> <div class="metric-content" data-astro-cid-5a6mzon6> <h3 data-astro-cid-5a6mzon6>Total Articles</h3> <div class="metric-value" id="totalArticles" data-astro-cid-5a6mzon6>Loading...</div> <div class="metric-period" data-astro-cid-5a6mzon6>From Sanity CMS</div> </div> </div> </div> <!-- Charts Section --> <div class="charts-section" data-astro-cid-5a6mzon6> <div class="chart-container" data-astro-cid-5a6mzon6> <h3 data-astro-cid-5a6mzon6>📊 Page Views Trend (Last 30 Days)</h3> <div class="chart-placeholder" id="pageViewsChart" data-astro-cid-5a6mzon6> <div class="loading-spinner" data-astro-cid-5a6mzon6>Loading chart...</div> </div> </div> <div class="chart-container" data-astro-cid-5a6mzon6> <h3 data-astro-cid-5a6mzon6>👥 Visitor Demographics</h3> <div class="chart-placeholder" id="visitorChart" data-astro-cid-5a6mzon6> <div class="loading-spinner" data-astro-cid-5a6mzon6>Loading chart...</div> </div> </div> </div> <!-- Top Content Section --> <div class="content-section" data-astro-cid-5a6mzon6> <h3 data-astro-cid-5a6mzon6>🔥 Top Performing Content</h3> <div class="content-list" id="topContent" data-astro-cid-5a6mzon6> <div class="loading-spinner" data-astro-cid-5a6mzon6>Loading top content...</div> </div> </div> <!-- Author Performance Section --> <div class="author-section" data-astro-cid-5a6mzon6> <h3 data-astro-cid-5a6mzon6>✍️ Author Performance</h3> <div class="author-list" id="authorPerformance" data-astro-cid-5a6mzon6> <div class="loading-spinner" data-astro-cid-5a6mzon6>Loading author data...</div> </div> </div> <!-- Refresh Button --> <div class="refresh-section" data-astro-cid-5a6mzon6> <button class="refresh-btn" id="refreshBtn" data-astro-cid-5a6mzon6>
🔄 Refresh Data
</button> <div class="last-updated" id="lastUpdated" data-astro-cid-5a6mzon6>
Last updated: Never
</div> </div> </div> </div> </div> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-5a6mzon6": true })} <!-- Analytics Dashboard JavaScript -->  </body> </html> `;
}, "/workspaces/ai-news-site/src/pages/admin/analytics.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/admin/analytics.astro";
const $$url = "/admin/analytics";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Analytics,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
