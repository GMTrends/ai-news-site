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
    structureTool(),
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