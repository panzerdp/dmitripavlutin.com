import * as React from 'react';

interface CarbonBannerLiveProps {
  scriptSrc: string;
}

export default function CarbonBannerLive({ scriptSrc }: CarbonBannerLiveProps): JSX.Element {
  return <script src={scriptSrc} id="_carbonads_js" async={true} />;
}
