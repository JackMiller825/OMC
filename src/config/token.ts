export const token = {
  name: 'One More Candle',
  ticker: 'OMC',
  displayTicker: '$OMC',
  network: null as string | null,
  contractAddress: null as string | null,
  tokenomics: {
    totalSupply: '1B',
    totalSupplyWords: '1 BILLION',
    tax: '0%',
    lpStatus: 'Burn',
    ownership: 'Renounce',
  },
  links: {
    dex: null as string | null,
    buy: null as string | null,
    chart: null as string | null,
    x: null as string | null,
    telegram: null as string | null,
  },
}

export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Story' },
  { id: 'tokenomics', label: 'Tokenomics' },
  { id: 'how-to-buy', label: 'How to Buy' },
  { id: 'community', label: 'Community' },
] as const

export type SectionId = (typeof sections)[number]['id']

export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}assets/omc/${path}`
}

export function httpsUrl(value: string | null): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') return null
    return url.href
  } catch {
    return null
  }
}

export function networkLabel(): string {
  return token.network ?? '[NETWORK]'
}

export function contractLabel(): string {
  return token.contractAddress ?? 'Coming Soon..'
}

export function isSectionId(id: string): id is SectionId {
  return sections.some((item) => item.id === id)
}
