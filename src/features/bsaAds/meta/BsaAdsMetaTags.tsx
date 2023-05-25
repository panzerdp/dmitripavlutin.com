export const BSA_ADS_SCRIPT_URL = 'https://cdn4.buysellads.net/pub/dmitripavlutin.js'
export const BSA_ADS_PREBID_SCRIPT_URL = 'https://cdn4.buysellads.net/pub/prebid-universal-creative.js?1.13.0'
export const GOOGLE_ADS_PRECONNECT = [
  ['adservice', 'https://adservice.google.com/'],
  ['doubleclick', 'https://googleads.g.doubleclick.net/'],
  ['googletagservices', 'https://www.googletagservices.com/'],
  ['tpc', 'https://tpc.googlesyndication.com/'],
  ['pagead2', 'https://pagead2.googlesyndication.com/'],
  ['pubads', 'https://securepubads.g.doubleclick.net/']
]

export function BsaAdsMetaTags() {
  return (
    <>
      <script src={BSA_ADS_SCRIPT_URL} data-testid="bsa-script" />
      <link href={BSA_ADS_SCRIPT_URL} data-testid="bsa-preload" rel="preload" as="script" />
      <link href={BSA_ADS_PREBID_SCRIPT_URL} data-testid="bsa-prebid" rel="preload" as="script" />

      {GOOGLE_ADS_PRECONNECT.map(([id, url]) => (
        <link
          rel="preconnect"
          data-testid={id}
          key={id}
          href={url}
        />
      ))}
    </>
  )
}