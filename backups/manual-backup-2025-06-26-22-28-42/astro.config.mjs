import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';

export default defineConfig({
  site: 'http://localhost:4321', // Change to your actual domain when deployed
  output: 'server',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/admin'), // Exclude admin pages
      customPages: [
        'http://localhost:4321/', // Homepage
        'http://localhost:4321/categories',
        'http://localhost:4321/about',
      ]
    }),
    sanity({
      projectId: 'crtekmb2',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: true, // Enable CDN for better performance
      studioBasePath: '/admin'
    }),
  ],
  adapter: netlify(),
  build: {
    // Performance optimizations
    inlineStylesheets: 'auto',
    split: true,
    assets: '_astro'
  },
  vite: {
    ssr: {
      external: []
    },
    server: {
      port: 4321,
      strictPort: true
    },
    build: {
      // Performance optimizations
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'sanity-vendor': ['@sanity/client', '@sanity/image-url'],
            'utils-vendor': ['date-fns', 'clsx']
          }
        }
      },
      // Enable minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    // CSS optimization
    css: {
      devSourcemap: false
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', '@sanity/client']
    }
  },
  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});
