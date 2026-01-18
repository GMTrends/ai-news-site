import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';

export default defineConfig({
  // Serve static CSS from /styles in dev; also avoids false dynamic-route matches
  vite: {
    server: {
      fs: { strict: false },
      port: 4321,
      strictPort: true,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0'
      },
      hmr: { overlay: true },
      middlewareMode: false
    },
    ssr: {
      external: []
    },
    build: {
      // Performance optimizations with aggressive code splitting
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // CRITICAL: Isolate Sanity Studio and admin-only components
            if (id.includes('@sanity/vision') || 
                id.includes('sanity-studio') || 
                id.includes('studio-component')) {
              return 'admin-studio';
            }
            
            // Isolate large Sanity dependencies to admin chunk
            if (id.includes('@sanity/ui') || 
                id.includes('@sanity/desk-tool') ||
                id.includes('@sanity/default-layout') ||
                id.includes('@sanity/default-login')) {
              return 'admin-sanity';
            }
            
            // PHASE 2A: Split React into smaller, more specific chunks
            if (id.includes('react-dom/client') || id.includes('react-dom/server')) {
              return 'react-dom-vendor';
            }
            if (id.includes('react/') || id.includes('react/jsx')) {
              return 'react-core';
            }
            if (id.includes('react-dom') && !id.includes('client') && !id.includes('server')) {
              return 'react-dom-vendor';
            }
            if (id.includes('scheduler') || id.includes('react-reconciler')) {
              return 'react-internals';
            }
            
            // Motion and animation libraries (often unused on static pages)
            if (id.includes('framer-motion') || id.includes('motion-dom')) {
              return 'animation-vendor';
            }
            
            // PHASE 2A: Separate date utilities (often tree-shakeable)
            if (id.includes('date-fns')) {
              return 'date-vendor';
            }
            
            // PHASE 2A: Utility libraries with better granularity
            if (id.includes('clsx') || id.includes('classnames')) {
              return 'styling-vendor';
            }
            
            // Essential Sanity client (needed for public pages)
            if (id.includes('@sanity/client') || id.includes('@sanity/image-url')) {
              return 'sanity-client';
            }
            
            // PHASE 2A: Separate lodash for aggressive tree shaking
            if (id.includes('lodash')) {
              return 'lodash-vendor';
            }
            
            // JSON and data processing libraries
            if (id.includes('json-2-csv') || id.includes('csv') || id.includes('json')) {
              return 'data-vendor';
            }
            
            // Text processing and language libraries
            if (id.includes('refractor') || id.includes('prism') || id.includes('highlight')) {
              return 'text-vendor';
            }
            
            // Remaining large third-party libraries
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      },
      // Enhanced minification for production
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.warn', 'console.info'],
          unused: true,
          dead_code: true,
          // PHASE 2B: Aggressive tree shaking options
          side_effects: false,
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          unsafe_Function: true,
          unsafe_math: true,
          unsafe_symbols: true,
          unsafe_methods: true,
          unsafe_proto: true,
          unsafe_regexp: true,
          unsafe_undefined: true,
          toplevel: true,
          keep_infinity: true,
          passes: 3
        },
        mangle: {
          safari10: true,
          toplevel: true,
          properties: {
            regex: /^_/
          }
        },
        format: {
          comments: false
        }
      },
      // Target modern browsers for smaller bundles
      target: 'es2020',
      // PHASE 2B: Enhanced tree shaking
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
        preset: 'smallest'
      }
    },
    // CSS optimization with strategic loading and explicit MIME type handling
    css: {
      devSourcemap: false
    },
    // Optimize dependencies - exclude heavy admin deps from pre-bundling
    optimizeDeps: {
      include: ['react', 'react-dom', '@sanity/client'],
      exclude: ['@sanity/vision', '@sanity/ui', '@sanity/desk-tool']
    },
    // PHASE 2B: Enhanced External Dependencies Configuration
    external: [
      // Move non-critical dependencies to external
      'styled-components/macro',
      '@fontsource/inter/latin.css',
      '@fontsource/jetbrains-mono/latin.css', 
      '@fontsource/space-grotesk/latin.css'
    ],
    // Add explicit MIME type handling for development server
    plugins: [
      {
        name: 'css-mime-fix',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            // Fix MIME type for CSS files
            if (req.url && req.url.endsWith('.css')) {
              res.setHeader('Content-Type', 'text/css; charset=utf-8');
            }
            next();
          });
        }
      }
    ]
  },

  site: process.env.SITE_URL || 'http://localhost:4321', // Use environment variable
  output: 'server',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/admin'), // Exclude admin pages
      customPages: [
        process.env.SITE_URL || 'http://localhost:4321', // Homepage
        `${process.env.SITE_URL || 'http://localhost:4321'}/categories`,
        `${process.env.SITE_URL || 'http://localhost:4321'}/about`,
      ]
    }),
    sanity({
      projectId: process.env.VITE_SANITY_PROJECT_ID || 'crtekmb2',
      dataset: process.env.VITE_SANITY_DATASET || 'production',
      apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-01-01',
      useCdn: process.env.VITE_SANITY_USE_CDN === 'true' || true, // Enable CDN for better performance
      studioBasePath: '/admin'
    }),
  ],
  adapter: netlify(),
  build: {
    // Performance optimizations
    inlineStylesheets: 'auto',
    split: true,
    assets: '_astro',
    // Force cache busting for all assets
    assetsPrefix: undefined,
    // Set chunk size warnings for monitoring
    chunkSizeWarningLimit: 500 // 500kb warning threshold
  },
  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    // Development-specific settings to prevent caching issues
    domains: [],
    remotePatterns: []
  }
});
