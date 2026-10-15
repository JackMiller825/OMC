import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/barlow-condensed/600.css'
import '@fontsource/barlow-condensed/700.css'
import '@fontsource/barlow-condensed/800.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/bebas-neue/latin-400.css'
import '@fontsource/fraunces/latin-600.css'
import '@fontsource/fraunces/latin-700.css'
import '@fontsource/fraunces/latin-600-italic.css'
import '@fontsource/space-grotesk/latin-500.css'
import '@fontsource/space-grotesk/latin-700.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import '@fontsource/ibm-plex-mono/latin-600.css'
import '@fontsource/outfit/latin-500.css'
import '@fontsource/outfit/latin-800.css'
import '@fontsource/bricolage-grotesque/latin-500.css'
import '@fontsource/bricolage-grotesque/latin-800.css'
import './styles/omc-tokenomics-candle-stack.css'
import './styles/site.css'
import './styles/dashboard.css'
import App from './App.tsx'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root is missing.')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
