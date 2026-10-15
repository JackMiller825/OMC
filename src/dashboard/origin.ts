const HOSTED_API = 'https://omc.103.161.35.238.sslip.io'

export function apiOrigin(): string {
  if (typeof location === 'undefined') return ''
  const host = location.hostname.toLowerCase()
  // GitHub Pages is a different host from the visitor API. Local dev and the
  // sslip.io server stay same-origin.
  if (host === 'jackmiller825.github.io') return HOSTED_API
  return ''
}

export function apiUrl(path: string): string {
  return `${apiOrigin()}${path}`
}
