import * as React from 'react';
import Helmet from 'react-helmet';

interface LayoutCarbonAdsMetaTagsProps {
  carbonAdsService: CarbonAdsService;
}

export default function LayoutCarbonAdsMetaTags({
  carbonAdsService: { isEnabled, isProductionMode, scriptSrc },
}: LayoutCarbonAdsMetaTagsProps) {
  if (isEnabled && isProductionMode) {
    return (
      <Helmet>
        <link rel="prefetch" href={scriptSrc} />
        <link rel="preconnect" href="//cdn4.buysellads.net" />
      </Helmet>
    );
  }
  return null;
}
