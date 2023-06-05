import Helmet from 'react-helmet'

interface LayoutCarbonAdsMetaTagsProps {
  carbonAdsService: CarbonAdsService;
}

export default function LayoutCarbonAdsMetaTags({
  carbonAdsService: { isEnabled, isProductionMode, scriptSrc },
}: LayoutCarbonAdsMetaTagsProps) {
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
