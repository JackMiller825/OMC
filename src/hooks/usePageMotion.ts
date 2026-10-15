import { useEffect } from 'react'

export function usePageMotion() {
  useEffect(() => {
    const root = document.documentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onVisibility = () => {
      root.classList.toggle('is-hidden', document.visibilityState !== 'visible')
    }
    document.addEventListener('visibilitychange', onVisibility)
    onVisibility()

    if (reduced) {
      return () => {
        document.removeEventListener('visibilitychange', onVisibility)
        root.classList.remove('is-hidden')
      }
    }

    const reveals = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const need = Number(entry.target.getAttribute('data-reveal') || '0.15')
          if (entry.intersectionRatio + 0.001 >= need) {
            entry.target.classList.add('is-in')
            revealObserver.unobserve(entry.target)
          }
        }
      },
      { threshold: [0.15, 0.2, 0.25, 0.4] },
    )

    for (const node of reveals) {
      const need = Number(node.dataset.reveal || '0.15')
      const rect = node.getBoundingClientRect()
      const view = window.innerHeight || 1
      const visibleHeight = Math.min(rect.bottom, view) - Math.max(rect.top, 0)
      const ratio = rect.height > 0 ? Math.max(0, visibleHeight) / rect.height : 0
      if (ratio >= need) node.classList.add('is-in')
      else revealObserver.observe(node)
    }

    const drifters = [...document.querySelectorAll<HTMLElement>('[data-drift]')]
    const driftObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.classList.toggle('is-live', entry.isIntersecting)
      },
      { threshold: 0.2 },
    )
    for (const node of drifters) driftObserver.observe(node)

    root.classList.add('js-motion')
    return () => {
      revealObserver.disconnect()
      driftObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      root.classList.remove('js-motion', 'is-hidden')
    }
  }, [])
}
