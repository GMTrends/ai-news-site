import { d as createComponent, f as renderComponent, g as renderTemplate, b as createAstro, F as Fragment, u as unescapeHTML, e as addAttribute, m as maybeRenderHead, h as defineScriptVars, i as renderSlot, r as renderHead } from "./vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { a as $$TrackingPixels, b as $$Analytics, $ as $$BaseHead } from "./BaseHead_DlYNO4qP.mjs";
import { $ as $$HeaderPremium } from "./HeaderPremium_DLonACPk.mjs";
import { $ as $$Footer } from "./Footer_FSuDz8wK.mjs";
import "clsx";
/* empty css                             */
const $$HeaderToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "HeaderPremium", $$HeaderPremium, {})}`;
}, "/workspaces/ai-news-site/src/components/HeaderToggle.astro", void 0);
var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$Astro$2 = createAstro("http://localhost:4321");
const $$SEOOptimizer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SEOOptimizer;
  const {
    title,
    description,
    image = "/images/default-og.jpg",
    type = "website",
    publishedAt,
    modifiedAt,
    author,
    category,
    tags = [],
    readingTime,
    wordCount,
    canonicalUrl = Astro2.url.href,
    noindex = false,
    nofollow = false,
    structuredData
  } = Astro2.props;
  const siteUrl = Astro2.site?.href || "http://localhost:4321";
  const imageUrl = typeof image === "string" ? image : image.src;
  const fullImageUrl = imageUrl.startsWith("http") ? imageUrl : `${siteUrl}${imageUrl}`;
  const robots = [
    noindex ? "noindex" : "index",
    nofollow ? "nofollow" : "follow",
    "max-image-preview:large",
    "max-snippet:-1",
    "max-video-preview:-1"
  ].join(", ");
  const generateStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": type === "article" ? "NewsArticle" : type === "author" ? "Person" : "WebPage",
      "name": title,
      "description": description,
      "url": canonicalUrl,
      "image": fullImageUrl,
      "publisher": {
        "@type": "Organization",
        "name": "AI Buzz Media",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.png`,
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://twitter.com/aibuzzmedia",
          "https://linkedin.com/company/aibuzzmedia",
          "https://facebook.com/aibuzzmedia"
        ]
      }
    };
    if (type === "article") {
      return {
        ...baseData,
        "datePublished": publishedAt,
        "dateModified": modifiedAt || publishedAt,
        "author": author ? {
          "@type": "Person",
          "name": author.name,
          "url": author.slug ? `${siteUrl}/authors/${author.slug}` : void 0,
          "image": author.image ? {
            "@type": "ImageObject",
            "url": author.image.startsWith("http") ? author.image : `${siteUrl}${author.image}`,
            "width": 200,
            "height": 200
          } : void 0,
          "description": author.bio
        } : void 0,
        "articleSection": category?.name,
        "keywords": tags.join(", "),
        "wordCount": wordCount,
        "timeRequired": readingTime ? `PT${readingTime}M` : void 0,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".article-title", ".article-excerpt", ".content-body"]
        }
      };
    }
    if (type === "author") {
      return {
        ...baseData,
        "@type": "Person",
        "name": author?.name || title,
        "url": canonicalUrl,
        "image": author?.image ? {
          "@type": "ImageObject",
          "url": author.image.startsWith("http") ? author.image : `${siteUrl}${author.image}`,
          "width": 200,
          "height": 200
        } : void 0,
        "description": author?.bio || description,
        "knowsAbout": ["Artificial Intelligence", "Technology", "News"],
        "jobTitle": "AI Technology Journalist",
        "worksFor": {
          "@type": "Organization",
          "name": "AI Buzz Media",
          "url": siteUrl
        }
      };
    }
    return baseData;
  };
  const finalStructuredData = structuredData || generateStructuredData();
  return renderTemplate(_a$2 || (_a$2 = __template$2(['<!-- SEO Meta Tags --><meta name="robots"', '><meta name="author"', '><meta name="keywords"', '><!-- Open Graph --><meta property="og:type"', '><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:site_name" content="AI Buzz Media"><meta property="og:image"', '><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt"', '><meta property="og:locale" content="en_US">', "", "", "", "", '<!-- Twitter Card --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><meta property="twitter:site" content="@aibuzzmedia"><meta property="twitter:creator" content="@aibuzzmedia"><!-- Canonical URL --><link rel="canonical"', '><!-- Structured Data --><script type="application/ld+json">', "<\/script><!-- Additional SEO Enhancements -->", '<!-- Performance hints --><link rel="preconnect" href="https://fonts.googleapis.com" crossorigin><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="dns-prefetch" href="//www.google-analytics.com"><link rel="dns-prefetch" href="//www.googletagmanager.com"><!-- Security headers --><meta http-equiv="X-Content-Type-Options" content="nosniff"><meta http-equiv="X-XSS-Protection" content="1; mode=block"><meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin"><!-- Mobile optimization --><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="theme-color" content="#00d4ff"><!-- PWA manifest --><link rel="manifest" href="/manifest.json"><!-- Favicon and app icons --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="apple-touch-icon" href="/icons/icon-192x192.svg"><link rel="mask-icon" href="/favicon.svg" color="#00d4ff"><!-- RSS feed --><link rel="alternate" type="application/rss+xml" title="AI Buzz Media RSS Feed" href="/rss.xml"><!-- Sitemap --><link rel="sitemap" href="/sitemap-index.xml">'])), addAttribute(robots, "content"), addAttribute(author?.name || "AI Buzz Media", "content"), addAttribute(tags.join(", "), "content"), addAttribute(type === "article" ? "article" : "website", "content"), addAttribute(canonicalUrl, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(fullImageUrl, "content"), addAttribute(title, "content"), type === "article" && publishedAt && renderTemplate`<meta property="article:published_time"${addAttribute(publishedAt, "content")}>`, type === "article" && modifiedAt && renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedAt, "content")}>`, type === "article" && author && renderTemplate`<meta property="article:author"${addAttribute(author.name, "content")}>`, type === "article" && category && renderTemplate`<meta property="article:section"${addAttribute(category.name, "content")}>`, type === "article" && tags.length > 0 && tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`), addAttribute(canonicalUrl, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(fullImageUrl, "content"), addAttribute(canonicalUrl, "href"), unescapeHTML(JSON.stringify(finalStructuredData, null, 2)), type === "article" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<meta name="article:published_time"${addAttribute(publishedAt, "content")}>${modifiedAt && renderTemplate`<meta name="article:modified_time"${addAttribute(modifiedAt, "content")}>`}${author && renderTemplate`<meta name="article:author"${addAttribute(author.name, "content")}>`}${category && renderTemplate`<meta name="article:section"${addAttribute(category.name, "content")}>`}${tags.map((tag) => renderTemplate`<meta name="article:tag"${addAttribute(tag, "content")}>`)}${readingTime && renderTemplate`<meta name="article:reading_time"${addAttribute(readingTime.toString(), "content")}>`}${wordCount && renderTemplate`<meta name="article:word_count"${addAttribute(wordCount.toString(), "content")}>`}` })}`);
}, "/workspaces/ai-news-site/src/components/SEOOptimizer.astro", void 0);
const $$PerformanceMonitor = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="performance-monitor" style="position: fixed; top: 0; right: 0; width: 300px; height: 200px; pointer-events: none; z-index: 10000; display: none;"></div> `;
}, "/workspaces/ai-news-site/src/components/PerformanceMonitor.astro", void 0);
var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$1 = createAstro("http://localhost:4321");
const $$AdvancedCache = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AdvancedCache;
  const {
    enableServiceWorker = true,
    enablePreload = true,
    enablePrefetch = true,
    enableBackgroundSync = true
  } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["<script>(function(){", "\n  // Advanced Caching Strategies\n  class AdvancedCache {\n    constructor(options = {}) {\n      this.enableServiceWorker = options.enableServiceWorker ?? true;\n      this.enablePreload = options.enablePreload ?? true;\n      this.enablePrefetch = options.enablePrefetch ?? true;\n      this.enableBackgroundSync = options.enableBackgroundSync ?? true;\n      \n      this.cache = new Map();\n      this.preloadQueue = [];\n      this.prefetchQueue = [];\n      \n      this.init();\n    }\n    \n    init() {\n      if (typeof window === 'undefined') return;\n      \n      this.registerServiceWorker();\n      this.setupIntersectionObserver();\n      this.setupPreloadStrategy();\n      this.setupPrefetchStrategy();\n      this.setupBackgroundSync();\n    }\n    \n    async registerServiceWorker() {\n      // TEMPORARILY DISABLED FOR DEVELOPMENT - prevents cache issues during development\n      console.log('Service Worker registration disabled for development');\n      return;\n      \n      if (!this.enableServiceWorker || !('serviceWorker' in navigator)) return;\n      \n      try {\n        const registration = await navigator.serviceWorker.register('/sw.js');\n        console.log('Service Worker registered:', registration);\n        \n        // Handle updates\n        registration.addEventListener('updatefound', () => {\n          const newWorker = registration.installing;\n          if (newWorker) {\n            newWorker.addEventListener('statechange', () => {\n              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {\n                this.showUpdateNotification();\n              }\n            });\n          }\n        });\n      } catch (error) {\n        console.error('Service Worker registration failed:', error);\n      }\n    }\n    \n    setupIntersectionObserver() {\n      // Lazy load images and components\n      const imageObserver = new IntersectionObserver((entries, observer) => {\n        entries.forEach(entry => {\n          if (entry.isIntersecting) {\n            const img = entry.target;\n            const dataSrc = img.dataset.src;\n            \n            if (dataSrc) {\n              img.src = dataSrc;\n              img.classList.remove('lazy');\n              observer.unobserve(img);\n            }\n          }\n        });\n      }, {\n        rootMargin: '50px 0px',\n        threshold: 0.01\n      });\n      \n      // Observe all lazy images\n      document.querySelectorAll('img[data-src]').forEach(img => {\n        imageObserver.observe(img);\n      });\n      \n      // Lazy load components\n      const componentObserver = new IntersectionObserver((entries, observer) => {\n        entries.forEach(entry => {\n          if (entry.isIntersecting) {\n            const component = entry.target;\n            const componentType = component.dataset.component;\n            \n            if (componentType) {\n              this.loadComponent(component, componentType);\n              observer.unobserve(component);\n            }\n          }\n        });\n      }, {\n        rootMargin: '100px 0px',\n        threshold: 0.1\n      });\n      \n      document.querySelectorAll('[data-component]').forEach(component => {\n        componentObserver.observe(component);\n      });\n    }\n    \n    loadComponent(component, componentType) {\n      // Dynamic component loading logic\n      console.log('Loading component:', componentType);\n      // Implementation would go here\n    }\n    \n    setupPreloadStrategy() {\n      if (!this.enablePreload) return;\n      \n      // Preload critical resources\n      this.preloadCriticalResources();\n      \n      // Preload based on user behavior\n      this.setupUserBehaviorPreload();\n    }\n    \n    preloadCriticalResources() {\n      const criticalResources = [\n        // CSS is now handled by Astro's built-in bundling\n        // '/styles/global.css', // Removed - causes 404 error\n        '/fonts/atkinson-regular.woff',\n        '/fonts/atkinson-bold.woff'\n      ];\n      \n      criticalResources.forEach(resource => {\n        this.preloadResource(resource);\n      });\n    }\n    \n    preloadResource(url) {\n      if (this.cache.has(url)) return;\n      \n      const link = document.createElement('link');\n      link.rel = 'preload';\n      link.href = url;\n      link.as = this.getResourceType(url);\n      document.head.appendChild(link);\n      \n      this.cache.set(url, true);\n      this.preloadQueue.push(url);\n    }\n    \n    getResourceType(url) {\n      if (url.endsWith('.css')) return 'style';\n      if (url.endsWith('.js')) return 'script';\n      if (url.endsWith('.woff2') || url.endsWith('.woff') || url.endsWith('.ttf')) return 'font';\n      if (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.webp')) return 'image';\n      return 'fetch';\n    }\n    \n    setupUserBehaviorPreload() {\n      // Preload based on hover\n      document.addEventListener('mouseover', (event) => {\n        const link = event.target.closest('a');\n        if (link && link.href && !this.cache.has(link.href)) {\n          this.prefetchResource(link.href);\n        }\n      });\n      \n      // Preload based on scroll position\n      let scrollTimeout;\n      window.addEventListener('scroll', () => {\n        clearTimeout(scrollTimeout);\n        scrollTimeout = setTimeout(() => {\n          this.preloadVisibleContent();\n        }, 100);\n      });\n    }\n    \n    setupPrefetchStrategy() {\n      if (!this.enablePrefetch) return;\n      \n      // Prefetch likely next pages\n      this.prefetchLikelyPages();\n      \n      // Prefetch based on time spent on page\n      setTimeout(() => {\n        this.prefetchRelatedContent();\n      }, 3000);\n    }\n    \n    prefetchLikelyPages() {\n      const likelyPages = [\n        '/categories/ai-agents',\n        '/categories/business',\n        '/categories/productivity',\n        '/categories/creative',\n        '/categories/ecommerce',\n        '/categories/marketing',\n        '/about'\n      ];\n      \n      likelyPages.forEach(page => {\n        this.prefetchResource(page);\n      });\n    }\n    \n    prefetchResource(url) {\n      if (this.cache.has(url)) return;\n      \n      const link = document.createElement('link');\n      link.rel = 'prefetch';\n      link.href = url;\n      document.head.appendChild(link);\n      \n      this.cache.set(url, true);\n      this.prefetchQueue.push(url);\n    }\n    \n    prefetchRelatedContent() {\n      // Get current page category\n      const currentCategory = this.getCurrentCategory();\n      if (currentCategory && currentCategory !== 'categories') {\n        this.prefetchResource(`/categories/${currentCategory}`);\n      }\n    }\n    \n    setupBackgroundSync() {\n      if (!this.enableBackgroundSync || !('serviceWorker' in navigator)) return;\n      \n      // Queue offline actions\n      this.queueOfflineActions();\n      \n      // Sync when online\n      window.addEventListener('online', () => {\n        this.syncOfflineActions();\n      });\n    }\n    \n    preloadVisibleContent() {\n      // Preload content that's about to become visible\n      const viewportHeight = window.innerHeight;\n      \n      document.querySelectorAll('[data-preload]').forEach(element => {\n        const rect = element.getBoundingClientRect();\n        const isNearViewport = rect.top < viewportHeight + 200;\n        \n        if (isNearViewport) {\n          const preloadUrl = element.getAttribute('data-preload');\n          if (preloadUrl) {\n            this.preloadResource(preloadUrl);\n          }\n        }\n      });\n    }\n    \n    getCurrentCategory() {\n      const path = window.location.pathname;\n      const categoryMatch = path.match(/^\\/([^\\/]+)/);\n      return categoryMatch ? categoryMatch[1] : null;\n    }\n    \n    queueOfflineActions() {\n      // Queue form submissions, analytics, etc.\n      const offlineActions = JSON.parse(localStorage.getItem('offlineActions') || '[]');\n      \n      // Add current action if needed\n      if (this.hasOfflineAction()) {\n        offlineActions.push({\n          type: 'form_submission',\n          data: this.getFormData(),\n          timestamp: Date.now()\n        });\n        \n        localStorage.setItem('offlineActions', JSON.stringify(offlineActions));\n      }\n    }\n    \n    async syncOfflineActions() {\n      const offlineActions = JSON.parse(localStorage.getItem('offlineActions') || '[]');\n      \n      for (const action of offlineActions) {\n        try {\n          await this.processOfflineAction(action);\n        } catch (error) {\n          console.error('Failed to sync offline action:', error);\n        }\n      }\n      \n      // Clear processed actions\n      localStorage.removeItem('offlineActions');\n    }\n    \n    hasOfflineAction() {\n      // Check if there are pending form submissions\n      return document.querySelector('form[data-offline]') !== null;\n    }\n    \n    getFormData() {\n      const form = document.querySelector('form[data-offline]');\n      if (!form) return null;\n      \n      const formData = new FormData(form);\n      const data = {};\n      \n      for (const [key, value] of formData.entries()) {\n        data[key] = value;\n      }\n      \n      return data;\n    }\n    \n    async processOfflineAction(action) {\n      switch (action.type) {\n        case 'form_submission':\n          await fetch('/.netlify/functions/contact', {\n            method: 'POST',\n            headers: { 'Content-Type': 'application/json' },\n            body: JSON.stringify(action.data)\n          });\n          break;\n          \n        case 'analytics':\n          await fetch('/api/analytics', {\n            method: 'POST',\n            headers: { 'Content-Type': 'application/json' },\n            body: JSON.stringify(action.data)\n          });\n          break;\n      }\n    }\n    \n    showUpdateNotification() {\n      // Show update notification\n      const notification = document.createElement('div');\n      notification.className = 'update-notification';\n      notification.innerHTML = `\n        <div class=\"update-content\">\n          <p>🔄 New version available!</p>\n          <button onclick=\"window.location.reload()\">Update Now</button>\n        </div>\n      `;\n      \n      notification.style.cssText = `\n        position: absolute;\n        top: 20px;\n        right: 20px;\n        background: #00d4ff;\n        color: white;\n        padding: 1rem;\n        border-radius: 8px;\n        box-shadow: 0 4px 12px rgba(0,0,0,0.3);\n        z-index: 1000;\n        animation: slideIn 0.3s ease;\n        pointer-events: auto;\n      `;\n      \n      // Create a fixed container if it doesn't exist\n      let notificationContainer = document.getElementById('notification-container');\n      if (!notificationContainer) {\n        notificationContainer = document.createElement('div');\n        notificationContainer.id = 'notification-container';\n        notificationContainer.style.cssText = `\n          position: fixed;\n          top: 0;\n          right: 0;\n          width: 400px;\n          height: 100px;\n          pointer-events: none;\n          z-index: 1000;\n        `;\n        document.body.appendChild(notificationContainer);\n      }\n      \n      notificationContainer.appendChild(notification);\n      \n      // Auto-hide after 10 seconds\n      setTimeout(() => {\n        notification.remove();\n      }, 10000);\n    }\n    \n    // Cache management\n    clearCache() {\n      this.cache.clear();\n      this.preloadQueue = [];\n      this.prefetchQueue = [];\n      \n      if ('caches' in window) {\n        caches.keys().then(cacheNames => {\n          cacheNames.forEach(cacheName => {\n            caches.delete(cacheName);\n          });\n        });\n      }\n    }\n    \n    getCacheStats() {\n      return {\n        cacheSize: this.cache.size,\n        preloadQueue: this.preloadQueue.length,\n        prefetchQueue: this.prefetchQueue.length\n      };\n    }\n  }\n  \n  // Initialize advanced caching\n  const advancedCache = new AdvancedCache({\n    enableServiceWorker: enableServiceWorker,\n    enablePreload: enablePreload,\n    enablePrefetch: enablePrefetch,\n    enableBackgroundSync: enableBackgroundSync\n  });\n  \n  // Expose for debugging\n  window.advancedCache = advancedCache;\n})();<\/script> "], ["<script>(function(){", "\n  // Advanced Caching Strategies\n  class AdvancedCache {\n    constructor(options = {}) {\n      this.enableServiceWorker = options.enableServiceWorker ?? true;\n      this.enablePreload = options.enablePreload ?? true;\n      this.enablePrefetch = options.enablePrefetch ?? true;\n      this.enableBackgroundSync = options.enableBackgroundSync ?? true;\n      \n      this.cache = new Map();\n      this.preloadQueue = [];\n      this.prefetchQueue = [];\n      \n      this.init();\n    }\n    \n    init() {\n      if (typeof window === 'undefined') return;\n      \n      this.registerServiceWorker();\n      this.setupIntersectionObserver();\n      this.setupPreloadStrategy();\n      this.setupPrefetchStrategy();\n      this.setupBackgroundSync();\n    }\n    \n    async registerServiceWorker() {\n      // TEMPORARILY DISABLED FOR DEVELOPMENT - prevents cache issues during development\n      console.log('Service Worker registration disabled for development');\n      return;\n      \n      if (!this.enableServiceWorker || !('serviceWorker' in navigator)) return;\n      \n      try {\n        const registration = await navigator.serviceWorker.register('/sw.js');\n        console.log('Service Worker registered:', registration);\n        \n        // Handle updates\n        registration.addEventListener('updatefound', () => {\n          const newWorker = registration.installing;\n          if (newWorker) {\n            newWorker.addEventListener('statechange', () => {\n              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {\n                this.showUpdateNotification();\n              }\n            });\n          }\n        });\n      } catch (error) {\n        console.error('Service Worker registration failed:', error);\n      }\n    }\n    \n    setupIntersectionObserver() {\n      // Lazy load images and components\n      const imageObserver = new IntersectionObserver((entries, observer) => {\n        entries.forEach(entry => {\n          if (entry.isIntersecting) {\n            const img = entry.target;\n            const dataSrc = img.dataset.src;\n            \n            if (dataSrc) {\n              img.src = dataSrc;\n              img.classList.remove('lazy');\n              observer.unobserve(img);\n            }\n          }\n        });\n      }, {\n        rootMargin: '50px 0px',\n        threshold: 0.01\n      });\n      \n      // Observe all lazy images\n      document.querySelectorAll('img[data-src]').forEach(img => {\n        imageObserver.observe(img);\n      });\n      \n      // Lazy load components\n      const componentObserver = new IntersectionObserver((entries, observer) => {\n        entries.forEach(entry => {\n          if (entry.isIntersecting) {\n            const component = entry.target;\n            const componentType = component.dataset.component;\n            \n            if (componentType) {\n              this.loadComponent(component, componentType);\n              observer.unobserve(component);\n            }\n          }\n        });\n      }, {\n        rootMargin: '100px 0px',\n        threshold: 0.1\n      });\n      \n      document.querySelectorAll('[data-component]').forEach(component => {\n        componentObserver.observe(component);\n      });\n    }\n    \n    loadComponent(component, componentType) {\n      // Dynamic component loading logic\n      console.log('Loading component:', componentType);\n      // Implementation would go here\n    }\n    \n    setupPreloadStrategy() {\n      if (!this.enablePreload) return;\n      \n      // Preload critical resources\n      this.preloadCriticalResources();\n      \n      // Preload based on user behavior\n      this.setupUserBehaviorPreload();\n    }\n    \n    preloadCriticalResources() {\n      const criticalResources = [\n        // CSS is now handled by Astro's built-in bundling\n        // '/styles/global.css', // Removed - causes 404 error\n        '/fonts/atkinson-regular.woff',\n        '/fonts/atkinson-bold.woff'\n      ];\n      \n      criticalResources.forEach(resource => {\n        this.preloadResource(resource);\n      });\n    }\n    \n    preloadResource(url) {\n      if (this.cache.has(url)) return;\n      \n      const link = document.createElement('link');\n      link.rel = 'preload';\n      link.href = url;\n      link.as = this.getResourceType(url);\n      document.head.appendChild(link);\n      \n      this.cache.set(url, true);\n      this.preloadQueue.push(url);\n    }\n    \n    getResourceType(url) {\n      if (url.endsWith('.css')) return 'style';\n      if (url.endsWith('.js')) return 'script';\n      if (url.endsWith('.woff2') || url.endsWith('.woff') || url.endsWith('.ttf')) return 'font';\n      if (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.webp')) return 'image';\n      return 'fetch';\n    }\n    \n    setupUserBehaviorPreload() {\n      // Preload based on hover\n      document.addEventListener('mouseover', (event) => {\n        const link = event.target.closest('a');\n        if (link && link.href && !this.cache.has(link.href)) {\n          this.prefetchResource(link.href);\n        }\n      });\n      \n      // Preload based on scroll position\n      let scrollTimeout;\n      window.addEventListener('scroll', () => {\n        clearTimeout(scrollTimeout);\n        scrollTimeout = setTimeout(() => {\n          this.preloadVisibleContent();\n        }, 100);\n      });\n    }\n    \n    setupPrefetchStrategy() {\n      if (!this.enablePrefetch) return;\n      \n      // Prefetch likely next pages\n      this.prefetchLikelyPages();\n      \n      // Prefetch based on time spent on page\n      setTimeout(() => {\n        this.prefetchRelatedContent();\n      }, 3000);\n    }\n    \n    prefetchLikelyPages() {\n      const likelyPages = [\n        '/categories/ai-agents',\n        '/categories/business',\n        '/categories/productivity',\n        '/categories/creative',\n        '/categories/ecommerce',\n        '/categories/marketing',\n        '/about'\n      ];\n      \n      likelyPages.forEach(page => {\n        this.prefetchResource(page);\n      });\n    }\n    \n    prefetchResource(url) {\n      if (this.cache.has(url)) return;\n      \n      const link = document.createElement('link');\n      link.rel = 'prefetch';\n      link.href = url;\n      document.head.appendChild(link);\n      \n      this.cache.set(url, true);\n      this.prefetchQueue.push(url);\n    }\n    \n    prefetchRelatedContent() {\n      // Get current page category\n      const currentCategory = this.getCurrentCategory();\n      if (currentCategory && currentCategory !== 'categories') {\n        this.prefetchResource(\\`/categories/\\${currentCategory}\\`);\n      }\n    }\n    \n    setupBackgroundSync() {\n      if (!this.enableBackgroundSync || !('serviceWorker' in navigator)) return;\n      \n      // Queue offline actions\n      this.queueOfflineActions();\n      \n      // Sync when online\n      window.addEventListener('online', () => {\n        this.syncOfflineActions();\n      });\n    }\n    \n    preloadVisibleContent() {\n      // Preload content that's about to become visible\n      const viewportHeight = window.innerHeight;\n      \n      document.querySelectorAll('[data-preload]').forEach(element => {\n        const rect = element.getBoundingClientRect();\n        const isNearViewport = rect.top < viewportHeight + 200;\n        \n        if (isNearViewport) {\n          const preloadUrl = element.getAttribute('data-preload');\n          if (preloadUrl) {\n            this.preloadResource(preloadUrl);\n          }\n        }\n      });\n    }\n    \n    getCurrentCategory() {\n      const path = window.location.pathname;\n      const categoryMatch = path.match(/^\\\\/([^\\\\/]+)/);\n      return categoryMatch ? categoryMatch[1] : null;\n    }\n    \n    queueOfflineActions() {\n      // Queue form submissions, analytics, etc.\n      const offlineActions = JSON.parse(localStorage.getItem('offlineActions') || '[]');\n      \n      // Add current action if needed\n      if (this.hasOfflineAction()) {\n        offlineActions.push({\n          type: 'form_submission',\n          data: this.getFormData(),\n          timestamp: Date.now()\n        });\n        \n        localStorage.setItem('offlineActions', JSON.stringify(offlineActions));\n      }\n    }\n    \n    async syncOfflineActions() {\n      const offlineActions = JSON.parse(localStorage.getItem('offlineActions') || '[]');\n      \n      for (const action of offlineActions) {\n        try {\n          await this.processOfflineAction(action);\n        } catch (error) {\n          console.error('Failed to sync offline action:', error);\n        }\n      }\n      \n      // Clear processed actions\n      localStorage.removeItem('offlineActions');\n    }\n    \n    hasOfflineAction() {\n      // Check if there are pending form submissions\n      return document.querySelector('form[data-offline]') !== null;\n    }\n    \n    getFormData() {\n      const form = document.querySelector('form[data-offline]');\n      if (!form) return null;\n      \n      const formData = new FormData(form);\n      const data = {};\n      \n      for (const [key, value] of formData.entries()) {\n        data[key] = value;\n      }\n      \n      return data;\n    }\n    \n    async processOfflineAction(action) {\n      switch (action.type) {\n        case 'form_submission':\n          await fetch('/.netlify/functions/contact', {\n            method: 'POST',\n            headers: { 'Content-Type': 'application/json' },\n            body: JSON.stringify(action.data)\n          });\n          break;\n          \n        case 'analytics':\n          await fetch('/api/analytics', {\n            method: 'POST',\n            headers: { 'Content-Type': 'application/json' },\n            body: JSON.stringify(action.data)\n          });\n          break;\n      }\n    }\n    \n    showUpdateNotification() {\n      // Show update notification\n      const notification = document.createElement('div');\n      notification.className = 'update-notification';\n      notification.innerHTML = \\`\n        <div class=\"update-content\">\n          <p>🔄 New version available!</p>\n          <button onclick=\"window.location.reload()\">Update Now</button>\n        </div>\n      \\`;\n      \n      notification.style.cssText = \\`\n        position: absolute;\n        top: 20px;\n        right: 20px;\n        background: #00d4ff;\n        color: white;\n        padding: 1rem;\n        border-radius: 8px;\n        box-shadow: 0 4px 12px rgba(0,0,0,0.3);\n        z-index: 1000;\n        animation: slideIn 0.3s ease;\n        pointer-events: auto;\n      \\`;\n      \n      // Create a fixed container if it doesn't exist\n      let notificationContainer = document.getElementById('notification-container');\n      if (!notificationContainer) {\n        notificationContainer = document.createElement('div');\n        notificationContainer.id = 'notification-container';\n        notificationContainer.style.cssText = \\`\n          position: fixed;\n          top: 0;\n          right: 0;\n          width: 400px;\n          height: 100px;\n          pointer-events: none;\n          z-index: 1000;\n        \\`;\n        document.body.appendChild(notificationContainer);\n      }\n      \n      notificationContainer.appendChild(notification);\n      \n      // Auto-hide after 10 seconds\n      setTimeout(() => {\n        notification.remove();\n      }, 10000);\n    }\n    \n    // Cache management\n    clearCache() {\n      this.cache.clear();\n      this.preloadQueue = [];\n      this.prefetchQueue = [];\n      \n      if ('caches' in window) {\n        caches.keys().then(cacheNames => {\n          cacheNames.forEach(cacheName => {\n            caches.delete(cacheName);\n          });\n        });\n      }\n    }\n    \n    getCacheStats() {\n      return {\n        cacheSize: this.cache.size,\n        preloadQueue: this.preloadQueue.length,\n        prefetchQueue: this.prefetchQueue.length\n      };\n    }\n  }\n  \n  // Initialize advanced caching\n  const advancedCache = new AdvancedCache({\n    enableServiceWorker: enableServiceWorker,\n    enablePreload: enablePreload,\n    enablePrefetch: enablePrefetch,\n    enableBackgroundSync: enableBackgroundSync\n  });\n  \n  // Expose for debugging\n  window.advancedCache = advancedCache;\n})();<\/script> "])), defineScriptVars({ enableServiceWorker, enablePreload, enablePrefetch, enableBackgroundSync }));
}, "/workspaces/ai-news-site/src/components/AdvancedCache.astro", void 0);
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("http://localhost:4321");
const $$MainLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const {
    title,
    description,
    image = "/images/default-og.jpg",
    type = "website",
    publishedAt,
    modifiedAt,
    author,
    category,
    tags = [],
    readingTime,
    wordCount,
    canonicalUrl,
    noindex = false,
    nofollow = false,
    structuredData,
    bodyClass = "gpu-accelerated"
  } = Astro2.props;
  const canonicalURL = canonicalUrl || Astro2.url.href;
  return renderTemplate(_a || (_a = __template(['<html lang="en" class="performance-optimized" data-astro-cid-ouamjn2i> <head>', '<!-- CRITICAL INLINE CSS - Hero Form No-Shift Guarantee --><!-- CSS imports as link tags for proper serving --><link rel="stylesheet" href="/styles/critical.css"><link rel="stylesheet" href="/styles/global.css"><link rel="stylesheet" href="/styles/layout.css"><link rel="stylesheet" href="/styles/components.css"><link rel="stylesheet" href="/styles/utilities.css"><!-- Advanced SEO Optimization -->', "<!-- Performance Monitoring -->", "<!-- Advanced Caching -->", '<!-- Additional Performance Optimizations --><script src="/unregister-sw.js"><\/script><!-- Structured Data for Organization --><script type="application/ld+json">', '<\/script><!-- Performance optimizations --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="dns-prefetch" href="https://cdn.sanity.io"><link rel="preconnect" href="https://cdn.sanity.io"><link rel="dns-prefetch" href="https://www.google-analytics.com"><link rel="dns-prefetch" href="https://www.googletagmanager.com"><link rel="dns-prefetch" href="https://connect.facebook.net"><link rel="dns-prefetch" href="https://static.ads-twitter.com"><link rel="preload" as="image" href="/favicon.ico"><!-- Critical CSS inlined -->', '</head> <body data-astro-cid-ouamjn2i> <!-- Skip link for accessibility --> <a href="#main-content" class="skip-link" data-astro-cid-ouamjn2i>Skip to main content</a> ', ' <main id="main-content" class="main-content" data-astro-cid-ouamjn2i> ', " </main> ", " <!-- Performance monitoring --> ", " <!-- Analytics --> ", " ", " <!-- Performance optimization script -->  <!-- Development Cache-Killing Service Worker -->  </body> </html>  "])), renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "image": image, "canonicalUrl": canonicalURL, "noindex": noindex, "structuredData": structuredData, "data-astro-cid-ouamjn2i": true }), renderComponent($$result, "SEOOptimizer", $$SEOOptimizer, { "title": title, "description": description, "image": image, "type": type, "publishedAt": publishedAt, "modifiedAt": modifiedAt, "author": author, "category": category, "tags": tags, "readingTime": readingTime, "wordCount": wordCount, "canonicalUrl": canonicalURL, "noindex": noindex, "nofollow": nofollow, "data-astro-cid-ouamjn2i": true }), renderComponent($$result, "PerformanceMonitor", $$PerformanceMonitor, { "enableAnalytics": true, "enableConsole": false, "enableRealUserMonitoring": true, "data-astro-cid-ouamjn2i": true }), renderComponent($$result, "AdvancedCache", $$AdvancedCache, { "enableServiceWorker": true, "enablePreload": true, "enablePrefetch": true, "enableBackgroundSync": true, "data-astro-cid-ouamjn2i": true }), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AI Buzz Media",
    "url": Astro2.site || "http://localhost:4321",
    "logo": {
      "@type": "ImageObject",
      "url": `${Astro2.site || "http://localhost:4321"}/logo.png`,
      "width": 512,
      "height": 512
    },
    "description": "Latest AI news, reviews, and insights from industry experts",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/aibuzzmedia",
      "https://linkedin.com/company/aibuzzmedia",
      "https://facebook.com/aibuzzmedia",
      "https://youtube.com/@aibuzzmedia"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contact@aibuzzmedia.com",
      "url": `${Astro2.site || "http://localhost:4321"}/contact`
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Buzz Media",
      "url": Astro2.site || "http://localhost:4321"
    }
  })), renderHead(), renderComponent($$result, "HeaderToggle", $$HeaderToggle, { "data-astro-cid-ouamjn2i": true }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-ouamjn2i": true }), renderComponent($$result, "PerformanceMonitor", $$PerformanceMonitor, { "data-astro-cid-ouamjn2i": true }), renderComponent($$result, "Analytics", $$Analytics, { "data-astro-cid-ouamjn2i": true }), renderComponent($$result, "TrackingPixels", $$TrackingPixels, { "data-astro-cid-ouamjn2i": true }));
}, "/workspaces/ai-news-site/src/layouts/MainLayout.astro", void 0);
export {
  $$MainLayout as $
};
