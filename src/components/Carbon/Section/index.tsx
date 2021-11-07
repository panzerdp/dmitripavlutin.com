import * as styles from './index.module.scss';

import CarbonFetch from 'components/Carbon/Fetch';
import CarbonAd from 'components/Carbon/Ad';

export default function CarbonSection(): JSX.Element {
  return null;
  return (
    <div className={styles.carbonSection}>
      <CarbonFetch render={renderCarbon} />
    </div>
  );
}

function renderCarbon(service: CarbonAdsService): JSX.Element {
  return <CarbonAd carbonAdsService={service} />;
}