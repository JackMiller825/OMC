import { useEffect, useId, useRef, useState } from 'react'
import { asset, httpsUrl, sections, token, type SectionId } from '../config/token.ts'

type SiteHeaderProps = {
  activeId: SectionId
}

export function SiteHeader({ activeId }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const menuId = useId()
  const buy = httpsUrl(token.links.buy)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="site-header" ref={headerRef}>
      <div className="wrap header-bar">
        <a className="brand" href="#home" onClick={close}>
          <img src={asset('brand/omc-logo-transparent.png')} alt="One More Candle logo" width={1024} height={1024} />
          <span className="brand-text">
            <strong>ONE MORE CANDLE</strong>
            <small>{token.displayTicker}</small>
          </span>
        </a>
        <button
          ref={buttonRef}
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id={menuId} className={open ? 'site-nav is-open' : 'site-nav'} aria-label="Primary">
          {sections.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeId === item.id ? 'location' : undefined}
              onClick={close}
            >
              {item.label}
            </a>
          ))}
        </nav>
        {buy ? (
          <a className="ca-pill" href={buy} target="_blank" rel="noopener noreferrer">
            BUY {token.displayTicker}
          </a>
        ) : (
          <span className="ca-pill" role="status">
            CA: COMING SOON
          </span>
        )}
      </div>
    </header>
  )
}
