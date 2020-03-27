import * as React from 'react';

import CarbonBannerDemo from 'components/Carbon/Banner/Demo';
import CarbonBannerLive from 'components/Carbon/Banner/Live';

import './index.module.scss';

interface CarbonAdProps {
  carbonAdsService: CarbonAdsService;
}

export default function CarbonAd(props: CarbonAdProps): JSX.Element {
  const { isEnabled, isProductionMode, scriptSrc } = props.carbonAdsService;
  if (!isEnabled) {
    return null;
  }
  if (!isProductionMode) {
    return <CarbonBannerDemo />;
  }
  return <CarbonBannerLive scriptSrc={scriptSrc} />;
}
