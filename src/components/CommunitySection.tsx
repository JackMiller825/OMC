import { asset, httpsUrl, token } from '../config/token.ts'
import { trackCta, type Cta } from '../analytics/tracker.ts'
import { Cutout } from './Cutout.tsx'

export function CommunitySection() {
  const telegram = httpsUrl(token.links.telegram)
  const x = httpsUrl(token.links.x)

  return (
    <section className="community" id="community" aria-labelledby="community-title">
      <div className="wrap community-layout">
        <div className="community-copy">
          <p className="eyebrow">THE SCREEN IS BETTER TOGETHER</p>
          <h2 id="community-title">Pull up a chair.</h2>
          <p>
            Share the late-night chart ritual, trade memes, and keep the conversation going with the $OMC community.
            Bring your own coffee. The next candle is on the screen.
          </p>
          <div className="actions community-actions">
            <OfficialLink href={telegram} click="telegram" pending="Telegram · [OFFICIAL_LINK]" ready="Telegram" />
            <OfficialLink href={x} click="x" pending="X · [OFFICIAL_LINK]" ready="X" outline />
          </div>
        </div>
        <figure className="community-figure" data-reveal="0.25">
          <div className="community-frame">
            <div className="floater">
              <Cutout
                src={asset('community/omc-community-midnight-trader-coffee-toast.png')}
                alt="Midnight trader raising a coffee mug and waving from the night shift."
              />
              <img
                className="steam"
                src={asset('community/omc-community-coffee-steam.svg')}
                alt=""
                width={320}
                height={280}
                decoding="async"
                aria-hidden="true"
              />
            </div>
            <p className="night-chip">THE NIGHT SHIFT IS OPEN</p>
          </div>
        </figure>
      </div>
    </section>
  )
}

function OfficialLink({
  href,
  click,
  pending,
  ready,
  outline = false,
}: {
  href: string | null
  click: Cta
  pending: string
  ready: string
  outline?: boolean
}) {
  const className = outline ? 'cta cta-outline' : 'cta cta-solid'
  if (!href) {
    return (
      <button type="button" className={className} disabled>
        {pending}
        <span className="sr-only"> Official link not published yet.</span>
      </button>
    )
  }
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer" onClick={() => trackCta(click)}>
      {ready}
    </a>
  )
}
