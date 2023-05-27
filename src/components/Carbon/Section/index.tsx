import * as styles from './index.module.scss'

import CarbonFetch from 'components/Carbon/Fetch'
import CarbonAd from 'components/Carbon/Ad'

export default function CarbonSection(): JSX.Element {
  return <CarbonFetch render={renderCarbon} />
}

function renderCarbon(service: CarbonAdsService): JSX.Element {
  if (!service.isEnabled) {
    return null
  }
  return (
    <div className={styles.carbonSection}>
      <CarbonAd carbonAdsService={service} />
    </div>
  )
}