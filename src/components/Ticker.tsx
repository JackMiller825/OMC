const PHRASE = 'ONE MORE CANDLE ✳ STILL WATCHING ✳ $OMC ✳ JUST ONE MORE'

export function Ticker() {
  const repeated = `${PHRASE} ✳ ${PHRASE} ✳ ${PHRASE} ✳ `
  return (
    <div className="ticker">
      <p className="sr-only">One more candle. Still watching. $OMC. Just one more.</p>
      <p className="ticker-static">{PHRASE}</p>
      <div className="ticker-track" aria-hidden="true">
        <span>{repeated}</span>
        <span>{repeated}</span>
      </div>
    </div>
  )
}
