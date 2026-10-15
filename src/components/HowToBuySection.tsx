import { httpsUrl, networkLabel, token } from '../config/token.ts'
import { trackCta } from '../analytics/tracker.ts'

const STEPS = [
  {
    n: '01',
    label: 'PREPARE',
    title: 'Set up a wallet',
    icon: 'wallet',
  },
  {
    n: '02',
    label: 'FUND',
    title: 'Add network funds',
    icon: 'fund',
  },
  {
    n: '03',
    label: 'VERIFY',
    title: 'Check the contract',
    icon: 'check',
  },
  {
    n: '04',
    label: 'SWAP',
    title: 'Use the official DEX',
    icon: 'swap',
  },
] as const

export function HowToBuySection() {
  const dex = httpsUrl(token.links.dex)
  const contract = token.contractAddress

  return (
    <section className="buy" id="how-to-buy" aria-labelledby="buy-title">
      <div className="wrap">
        <div className="buy-head">
          <div>
            <p className="eyebrow">WHEN THE OFFICIAL LINKS ARE LIVE</p>
            <h2 id="buy-title">How to join the candle watch.</h2>
          </div>
          <p>Four clear steps. Use only official contract and trading links when they are announced.</p>
        </div>
        <div className="steps" data-reveal="0.15">
          {STEPS.map((step, index) => (
            <article className="step" key={step.n} style={{ transitionDelay: `${index * 90}ms` }}>
              <p className="step-kicker">
                {step.n} / {step.label}
              </p>
              <StepIcon name={step.icon} />
              <h3>{step.title}</h3>
              <StepText name={step.icon} dex={dex} contract={contract} />
            </article>
          ))}
        </div>
        <p className="link-check">
          <span>LINK CHECK</span> — Contract, network, and exchange links are placeholders until officially confirmed.
        </p>
        <a className="cta cta-solid" href="#tokenomics">
          VIEW TOKEN DETAILS ↓
        </a>
      </div>
    </section>
  )
}

function StepText({ name, dex, contract }: { name: string; dex: string | null; contract: string | null }) {
  if (name === 'wallet') {
    return <p>Choose a self-custody wallet that supports {networkLabel()}. Keep your recovery phrase private.</p>
  }
  if (name === 'fund') {
    return <p>Fund your wallet with the network’s native token for the swap and any network fees.</p>
  }
  if (name === 'check') {
    return (
      <p>
        Compare the address on this page with the official announcement: {contract ?? '[CONTRACT_ADDRESS]'}.
      </p>
    )
  }
  if (!dex) {
    return <p>Open [DEX_LINK], review the details, and decide for yourself before confirming a swap.</p>
  }
  return (
    <p>
      Open{' '}
      <a href={dex} target="_blank" rel="noopener noreferrer" onClick={() => trackCta('buy')}>
        {dex}
      </a>
      , review the details, and decide for yourself before confirming a swap.
    </p>
  )
}

function StepIcon({ name }: { name: string }) {
  if (name === 'wallet') {
    return (
      <span className="step-icon" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <rect x="10" y="14" width="28" height="22" rx="4" fill="none" stroke="currentColor" strokeWidth="2.4" />
          <path d="M16 14v-2a8 8 0 0 1 16 0v2" fill="none" stroke="currentColor" strokeWidth="2.4" />
          <circle cx="30" cy="25" r="2" fill="currentColor" />
        </svg>
      </span>
    )
  }
  if (name === 'fund') {
    return (
      <span className="step-icon step-icon-solid" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="10" fill="none" stroke="currentColor" strokeWidth="2.4" />
          <path d="M24 18v12M20 22h6.5a2.5 2.5 0 0 1 0 5H21" fill="none" stroke="currentColor" strokeWidth="2.2" />
        </svg>
      </span>
    )
  }
  if (name === 'check') {
    return (
      <span className="step-icon step-icon-solid" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <path d="M15 25.5 21 31l12-14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    )
  }
  return (
    <span className="step-icon step-icon-solid" aria-hidden="true">
      <svg viewBox="0 0 48 48">
        <path d="M18 30 30 18M20 18h10v10" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}
