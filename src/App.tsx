import { lazy, Suspense, useEffect, useState } from 'react'
import { startPublicAnalytics } from './analytics/tracker.ts'
import { CommunitySection } from './components/CommunitySection.tsx'
import { HeroSection } from './components/HeroSection.tsx'
import { HowToBuySection } from './components/HowToBuySection.tsx'
import { SiteFooter } from './components/SiteFooter.tsx'
import { SiteHeader } from './components/SiteHeader.tsx'
import { StorySection } from './components/StorySection.tsx'
import { Ticker } from './components/Ticker.tsx'
import { TokenomicsSection } from './components/TokenomicsSection.tsx'
import { isDashboardLocation } from './dashboard/path.ts'
import { useActiveSection } from './hooks/useActiveSection.ts'
import { useHashAlignment } from './hooks/useHashAlignment.ts'
import { usePageMotion } from './hooks/usePageMotion.ts'

const Dashboard = lazy(() => import('./dashboard/Dashboard.tsx'))

export default function App() {
  const [dashboard, setDashboard] = useState(() => isDashboardLocation())

  useEffect(() => {
    const sync = () => setDashboard(isDashboardLocation())
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  useEffect(() => {
    if (!dashboard) return
    const meta = document.querySelector('meta[name="robots"]')
    const previous = meta?.getAttribute('content') ?? null
    meta?.setAttribute('content', 'noindex, nofollow')
    const previousTitle = document.title
    document.title = 'Private Visitor Dashboard'
    return () => {
      if (previous) meta?.setAttribute('content', previous)
      document.title = previousTitle
    }
  }, [dashboard])

  if (dashboard) {
    return (
      <Suspense
        fallback={
          <main className="dash" id="dashboard-main">
            <h1>Private Visitor Dashboard</h1>
            <p role="status">Loading dashboard…</p>
          </main>
        }
      >
        <Dashboard />
      </Suspense>
    )
  }

  return <PublicSite />
}

function PublicSite() {
  const activeId = useActiveSection()
  useHashAlignment()
  usePageMotion()

  useEffect(() => startPublicAnalytics(), [])

  return (
    <>
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <SiteHeader activeId={activeId} />
      <main>
        <HeroSection />
        <Ticker />
        <StorySection />
        <TokenomicsSection />
        <HowToBuySection />
        <CommunitySection />
      </main>
      <SiteFooter activeId={activeId} />
    </>
  )
}
