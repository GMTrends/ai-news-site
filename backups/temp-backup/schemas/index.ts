import article from './article'
import author from './author'
import category from './category'
import siteSettings from './siteSettings'
import navigationMenu from './navigationMenu'
import mediaAsset from './mediaAsset'
import faq from './faq'

export const schemaTypes = [
  // Content Types
  article, 
  author, 
  category,
  faq,
  
  // Media & Assets
  mediaAsset,
  
  // Site Configuration
  siteSettings,
  navigationMenu,
] 