import { useRef, Fragment } from 'react';
import { useLocation } from '@reach/router';

import styles from './index.module.scss';
import CarbonBannerDemo from 'components/Carbon/Banner/Demo';
import CarbonBannerLive from 'components/Carbon/Banner/Live';

interface CarbonAdProps {
  carbonAdsService: CarbonAdsService;
}

export default function CarbonAd(props: CarbonAdProps): JSX.Element {
  const { isEnabled, isProductionMode, scriptSrc } = props.carbonAdsService;
  const container = useRef();
  const { pathname } = useLocation();

  if (!isEnabled) {
    return null;
  }

  return (
    <Fragment key={pathname}>
      <div ref={container} className={styles.carbonAd}></div>
      {isProductionMode ? (
        <CarbonBannerLive ref={container} scriptSrc={scriptSrc} />
      ) : (
        <CarbonBannerDemo ref={container} />
      )}
    </Fragment>
  );
}
