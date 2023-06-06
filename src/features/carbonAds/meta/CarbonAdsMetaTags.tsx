import Helmet from 'react-helmet'
import { useCarbonAdsMetadata } from '../model/useCarbonAdsMetadata'

export function CarbonAdsMetaTags() {
  const { isEnabled, isProductionMode, scriptSrc } = useCarbonAdsMetadata()

  if (isEnabled && isProductionMode) {
    return (
      <Helmet>
        <link rel="preload" href={scriptSrc} as="script" />
        <link rel="preconnect" href="//cdn4.buysellads.net" />
        <link rel="preconnect" href="//srv.carbonads.net" />
      </Helmet>
    )
  }
  return null
}
