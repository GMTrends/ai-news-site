import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'ai-buzz-media',
  title: 'AI Buzz Media CMS',
  
  projectId: 'crtekmb2',
  dataset: 'production',
  
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
})