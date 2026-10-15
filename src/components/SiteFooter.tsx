import { asset, sections, type SectionId } from '../config/token.ts'

type SiteFooterProps = {
  activeId: SectionId
}

export function SiteFooter({ activeId }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <a className="brand footer-brand" href="#home">
          <img src={asset('brand/omc-logo-transparent.png')} alt="One More Candle logo" width={1024} height={1024} />
          <span className="brand-text">
            <strong>ONE MORE CANDLE · $OMC</strong>
            <small>For everyone who said ‘just one more.’</small>
          </span>
        </a>
        <nav aria-label="Footer">
          {sections.map((item) => (
            <a key={item.id} href={`#${item.id}`} aria-current={activeId === item.id ? 'location' : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="wrap footer-bottom">
        <p>© 2026 One More Candle. A community meme token.</p>
        <p>Meme tokens are volatile and may lose value. This page is informational, not financial advice.</p>
      </div>
    </footer>
  )
}
