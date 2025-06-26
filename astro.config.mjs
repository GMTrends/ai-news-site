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
      useCdn: false,
      studioBasePath: '/admin'
    }),
  ],
  adapter: netlify(),
  vite: {
    ssr: {
      external: []
    },
    server: {
      port: 4321,
      strictPort: true
    }
  }
});
