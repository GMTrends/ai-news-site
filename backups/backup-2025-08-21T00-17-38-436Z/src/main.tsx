import { StudioProvider, StudioLayout } from 'sanity'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import config from '../sanity.config'

const root = createRoot(document.getElementById('sanity')!)

root.render(
  <StrictMode>
    <StudioProvider config={config}>
      <StudioLayout />
    </StudioProvider>
  </StrictMode>
)
