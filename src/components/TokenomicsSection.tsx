import { useState } from 'react'
import { contractLabel, networkLabel, token } from '../config/token.ts'

const STATS = [
  { label: 'TOTAL SUPPLY', value: token.tokenomics.totalSupply, note: token.tokenomics.totalSupplyWords },
  { label: 'BUY / SELL TAX', value: token.tokenomics.tax },
  { label: 'LP STATUS', value: token.tokenomics.lpStatus },
  { label: 'OWNERSHIP', value: token.tokenomics.ownership },
]

export function TokenomicsSection() {
  const address = token.contractAddress
  const [notice, setNotice] = useState('')

  async function copyAddress() {
    if (!address) return
    try {
      await navigator.clipboard.writeText(address)
      setNotice('Contract address copied.')
    } catch {
      setNotice('Clipboard access was denied. Select the address and copy it manually.')
    }
  }

  return (
    <section className="tokenomics" id="tokenomics" aria-labelledby="tokenomics-title">
      <div className="wrap token-layout">
        <div className="token-copy">
          <p className="eyebrow">THE NUMBERS, IN PLAIN SIGHT</p>
          <h2 id="tokenomics-title">Tokenomics at a glance.</h2>
          <p>
            Simple details for the late-night crew. Check the official contract before interacting once published.
          </p>
          <p className="supply-hero">{token.tokenomics.totalSupplyWords}</p>
          <p className="supply-label">TOTAL SUPPLY</p>
          <div
            className="omc-candle-scene"
            data-reveal="0.2"
            data-drift=""
            aria-hidden="true"
          >
            <div className="omc-candle-scene-glow" />
            <div className="omc-candle-stack">
              <div className="omc-candle" />
              <div className="omc-candle" />
              <div className="omc-candle" />
              <div className="omc-candle" />
              <div className="omc-candle" />
            </div>
          </div>
        </div>
        <div className="token-facts">
          <div className="stat-grid">
            {STATS.map((stat) => (
              <article className="stat" key={stat.label}>
                <p>{stat.label}</p>
                <strong>{stat.value}</strong>
                {stat.note ? <small>{stat.note}</small> : null}
              </article>
            ))}
          </div>
          <article className="contract">
            <div>
              <p>CONTRACT ADDRESS</p>
              <strong>{contractLabel()}</strong>
            </div>
            <button type="button" className="copy-btn" disabled={!address} onClick={() => void copyAddress()}>
              {address ? 'COPY ADDRESS' : 'CONTRACT COMING SOON'}
            </button>
          </article>
          <p className="network-line">
            <span>NETWORK</span> {networkLabel()}
          </p>
          <p className="sr-only" aria-live="polite">
            {notice}
          </p>
        </div>
      </div>
    </section>
  )
}
