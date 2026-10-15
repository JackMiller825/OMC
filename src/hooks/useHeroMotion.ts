import { useEffect, useState } from 'react'

const UNIT = 21.875

export function useHeroMotion() {
  const [shift, setShift] = useState({ x: 0, y: 0 })
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const stage = document.getElementById('hero-stage')
    if (!stage) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    let visible = true

    const syncPaused = () => {
      setPaused(!visible || document.visibilityState !== 'visible')
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting)
      if (!visible) setShift({ x: 0, y: 0 })
      syncPaused()
    })
    observer.observe(stage)

    const onVisibility = () => syncPaused()
    document.addEventListener('visibilitychange', onVisibility)

    const onMove = (event: PointerEvent) => {
      if (reduced.matches || !fine.matches || !visible) return
      const rect = stage.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const nx = (event.clientX - rect.left) / rect.width - 0.5
      const ny = (event.clientY - rect.top) / rect.height - 0.5
      setShift({ x: nx * 2 * UNIT, y: ny * 2 * UNIT })
    }
    const onLeave = () => setShift({ x: 0, y: 0 })

    if (!reduced.matches && fine.matches) {
      stage.addEventListener('pointermove', onMove)
      stage.addEventListener('pointerleave', onLeave)
    }

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return { shift, paused }
}

export function layerShift(axis: number, depth: number): number {
  return Math.max(-7, Math.min(7, axis * depth))
}
