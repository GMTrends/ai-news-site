import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/index'

export default defineConfig({
  name: 'ai-buzz-media',
  title: 'AI Buzz Media CMS',
  
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'crtekmb2',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content Management')
          .items([
            // Content Section
            S.listItem()
              .title('📰 Content')
              .child(
                S.list()
                  .title('Content Management')
                  .items([
                    S.listItem()
                      .title('📄 Articles')
                      .schemaType('article')
                      .child(S.documentTypeList('article').title('Articles')),
                    S.listItem()
                      .title('👥 Authors')
                      .schemaType('author')
                      .child(S.documentTypeList('author').title('Authors')),
                    S.listItem()
                      .title('📂 Categories')
                      .schemaType('category')
                      .child(S.documentTypeList('category').title('Categories')),
                    S.listItem()
                      .title('❓ FAQs')
                      .schemaType('faq')
                      .child(S.documentTypeList('faq').title('FAQs')),
                  ])
              ),
            
            // Media Section
            S.listItem()
              .title('📂 Media Library')
              .schemaType('mediaAsset')
              .child(S.documentTypeList('mediaAsset').title('Media Library')),
            
            // Site Configuration Section
            S.listItem()
              .title('⚙️ Site Configuration')
              .child(
                S.list()
                  .title('Site Configuration')
                  .items([
                    S.listItem()
                      .title('⚙️ Site Settings')
                      .child(
                        S.editor()
                          .id('siteSettings')
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                          .title('Site Settings')
                      ),
                    S.listItem()
                      .title('🧭 Navigation Menus')
                      .schemaType('navigationMenu')
                      .child(S.documentTypeList('navigationMenu').title('Navigation Menus')),
                  ])
              ),
            
            // Divider
            S.divider(),
            
            // All documents (for advanced users)
            ...S.documentTypeListItems().filter(
              (listItem) => !['siteSettings'].includes(listItem.getId() || '')
            ),
          ])
    }),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  // Add authentication and security settings
  auth: {
    redirectOnSingle: false,
    loginMethod: 'dual', // Supports both email/password and social login
  },
  
  // Security settings
  cors: {
    credentials: 'include',
    origin: [
      process.env.SITE_URL || 'http://localhost:4321',
      process.env.SANITY_STUDIO_URL || 'http://localhost:3333'
    ]
  },
  
  // API settings
  api: {
    projectId: process.env.VITE_SANITY_PROJECT_ID || 'crtekmb2',
    dataset: process.env.VITE_SANITY_DATASET || 'production',
  }
}) 