import { useEffect, useState } from 'react'
import { isSectionId, sections, type SectionId } from '../config/token.ts'

export function useActiveSection() {
  const [active, setActive] = useState<SectionId>('home')

  useEffect(() => {
    const ratios = new Map<string, number>()
    let published: SectionId | null = null

    const publish = (next: SectionId) => {
      setActive(next)
      if (published !== next) {
        published = next
        window.dispatchEvent(new CustomEvent('omc-section', { detail: next }))
      }
    }

    const pick = () => {
      let best: SectionId = 'home'
      let bestRatio = 0
      for (const item of sections) {
        const ratio = ratios.get(item.id) ?? 0
        if (ratio > bestRatio) {
          bestRatio = ratio
          best = item.id
        }
      }
      if (bestRatio > 0) publish(best)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        pick()
      },
      { rootMargin: '-12% 0px -45% 0px', threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] },
    )

    for (const item of sections) {
      const node = document.getElementById(item.id)
      if (node) observer.observe(node)
    }

    const onHash = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ''))
      if (isSectionId(id)) publish(id)
    }

    onHash()
    window.addEventListener('hashchange', onHash)
    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', onHash)
    }
  }, [])

  return active
}
