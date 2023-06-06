import Media from 'react-media'

import * as styles from './index.module.scss'

import {CarbonAdsSection} from 'features/carbonAds'

export default function ExcerptsListLeftSidebar() {
  return (
    <div className={styles.leftSidebar}>
      <Media query="(min-width: 1251px)" defaultMatches={false}>
        <CarbonAdsSection />
      </Media>
    </div>
  )
}
