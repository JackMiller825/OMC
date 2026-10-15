import { asset } from '../config/token.ts'
import { Cutout } from './Cutout.tsx'

export function StorySection() {
  return (
    <section className="story" id="story" aria-labelledby="story-title">
      <div className="wrap story-layout">
        <figure className="story-figure" data-reveal="0.25">
          <div className="story-frame">
            <p className="time-chip">01:47 AM</p>
            <div className="chart-accent" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <Cutout
              src={asset('story/omc-story-midnight-trader-rub-eyes.png')}
              alt="Tired midnight trader rubbing one eye while holding a mug of coffee."
            />
            <p className="one-more-chip">ONE MORE</p>
          </div>
        </figure>
        <div className="story-copy">
          <p className="eyebrow">THE ORIGIN OF THE RITUAL</p>
          <h2 id="story-title">It’s always one more.</h2>
          <p>
            One last look at the chart. One last sip of coffee. One last candle before bed. Then the screen flashes
            green, the room gets a little brighter, and suddenly sleep can wait. $OMC is a wink to every trader who
            knows the phrase ‘just one more candle’ has never meant just one.
          </p>
          <blockquote>
            A midnight ritual, a familiar face, and the tiny green bar that keeps the whole room awake.
          </blockquote>
          <div className="actions story-actions">
            <a className="cta cta-solid" href="#tokenomics">
              MEET $OMC ↓
            </a>
            <p className="micro">NO PROMISES. JUST ONE MORE CANDLE.</p>
          </div>
        </div>
      </div>
      <div className="wipe" data-reveal="0.2" aria-hidden="true">
        <img
          src={asset('transitions/omc-section-candle-wipe.svg')}
          alt=""
          width={520}
          height={900}
          decoding="async"
          onError={(event) => {
            event.currentTarget.hidden = true
          }}
        />
      </div>
    </section>
  )
}
