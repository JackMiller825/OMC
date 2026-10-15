import { useEffect } from 'react'
import { asset } from '../config/token.ts'
import { layerShift, useHeroMotion } from '../hooks/useHeroMotion.ts'
import { Cutout } from './Cutout.tsx'

const LAYERS = [
  { src: asset('hero/omc-hero-grid-back.svg'), depth: 0.08, className: 'grid' },
  { src: asset('hero/omc-hero-chart-candles-mid.svg'), depth: 0.16, className: 'candles' },
  { src: asset('hero/omc-hero-green-glow-front.svg'), depth: 0.32, className: 'glow' },
]

export function HeroSection() {
  const { shift, paused } = useHeroMotion()
  const rotation = Math.max(-1.5, Math.min(1.5, (shift.x / 21.875) * 1.5))

  useEffect(() => {
    const root = document.documentElement
    const countdown = root.classList.contains('hero-countdown')
    const simple = root.classList.contains('hero-reveal-simple')
    if (!countdown && !simple) return
    const done = () => {
      root.classList.remove('hero-countdown', 'hero-reveal-simple')
      try {
        sessionStorage.setItem('omc-candle-countdown', '1')
      } catch {
        /* Session storage can be blocked; the hero still finishes in the lit state. */
      }
    }
    const timer = window.setTimeout(done, countdown ? 2400 : 1200)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section className="hero" id="home" aria-labelledby="home-title">
      <div className="wrap hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">THE LATE-NIGHT TRADER’S RITUAL</p>
          <h1 id="home-title">
            <span>One more</span>
            <span>candle.</span>
          </h1>
          <p className="lede">
            The chart is still moving. The coffee is still warm. And that next green candle? It could be the one.
            Welcome to the nightly ritual of $OMC.
          </p>
          <div className="actions">
            <a className="cta cta-solid" href="#story">
              ENTER THE STORY ↓
            </a>
            <a className="cta cta-outline" href="#community">
              JOIN THE WATCH
            </a>
          </div>
          <p className="identity">
            <span className="dot" aria-hidden="true" />
            ONE MORE CANDLE · $OMC
          </p>
        </div>
        <div className={paused ? 'hero-stage is-paused' : 'hero-stage'} id="hero-stage">
          <div className="hero-entrance">
            {LAYERS.filter((layer) => layer.className !== 'glow').map((layer) => (
              <div
                key={layer.src}
                className={`depth depth-${layer.className}`}
                style={{
                  transform: `translate3d(${layerShift(shift.x, layer.depth)}px, ${layerShift(shift.y, layer.depth)}px, 0)`,
                }}
                aria-hidden="true"
              >
                <img
                  src={layer.src}
                  alt=""
                  width={1440}
                  height={1000}
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.hidden = true
                  }}
                />
              </div>
            ))}
            <div
              className="depth depth-trader"
              style={{
                transform: `translate3d(${layerShift(shift.x, 0.25)}px, ${layerShift(shift.y, 0.25)}px, 0) rotate(${rotation}deg)`,
              }}
            >
              <div className="float">
                <Cutout
                  eager
                  src={asset('hero/omc-hero-midnight-trader-lean-in.png')}
                  alt="Midnight trader in a hoodie, holding coffee and leaning in for one more candle."
                />
              </div>
            </div>
            <div
              className="depth depth-glow"
              style={{
                transform: `translate3d(${layerShift(shift.x, 0.32)}px, ${layerShift(shift.y, 0.32)}px, 0)`,
              }}
              aria-hidden="true"
            >
              <img
                src={asset('hero/omc-hero-green-glow-front.svg')}
                alt=""
                width={1440}
                height={1000}
                decoding="async"
                onError={(event) => {
                  event.currentTarget.hidden = true
                }}
              />
            </div>
          </div>
          <p className="watching">STILL WATCHING</p>
          <div className="countdown" aria-hidden="true">
            <span className="count-candle count-candle-red" />
            <span className="count-candle count-candle-red count-candle-tall" />
            <span className="count-candle count-candle-green" />
          </div>
        </div>
      </div>
    </section>
  )
}
