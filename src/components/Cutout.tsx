import { useState } from 'react'
import { asset } from '../config/token.ts'

const FALLBACK = asset('shared/omc-mascot-03-midnight-trader.png')

type CutoutProps = {
  src: string
  alt: string
  className?: string
  eager?: boolean
}

export function Cutout({ src, alt, className, eager = false }: CutoutProps) {
  const [current, setCurrent] = useState(src)

  return (
    <img
      className={className}
      src={current}
      alt={alt}
      width={1254}
      height={1254}
      decoding="async"
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      onError={() => {
        setCurrent((value) => (value === FALLBACK ? value : FALLBACK))
      }}
    />
  )
}
