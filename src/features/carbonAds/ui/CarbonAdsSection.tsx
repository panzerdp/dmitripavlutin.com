import * as styles from './CarbonAdsSection.module.scss'
import { useLocation } from '@reach/router'
import { CarbonAdsBannerLive, CarbonAdsBannerPlaceholder } from 'entities/carbonAds'
import { useCarbonAdsMetadata } from '../model/useCarbonAdsMetadata'

export function CarbonAdsSection(): JSX.Element {
  const { isEnabled, isProductionMode, scriptSrc } = useCarbonAdsMetadata()
  const { pathname } = useLocation()

  if (!isEnabled) {
    return null
  }

  return (
    <div className={styles.section} key={pathname}>
      {isProductionMode ? <CarbonAdsBannerLive scriptSrc={scriptSrc} /> : <CarbonAdsBannerPlaceholder /> }
    </div>
  )
}