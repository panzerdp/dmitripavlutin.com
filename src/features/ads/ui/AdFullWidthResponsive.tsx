import { useEffect } from 'react'
import { PUB_ID } from '../constants'
import * as styles from './AdFullWidthResponsive.module.scss'

interface AdFullWidthResponsiveProps {
  slot: string
}
export function AdFullWidthResponsive({ slot}: AdFullWidthResponsiveProps): JSX.Element {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [])

  return (
    <div className={styles.adFullWidthResponsive}>
      <ins className="adsbygoogle"
        data-ad-client={PUB_ID}
        data-ad-slot={slot}
        // data-ad-format="horizontal"
        data-full-width-responsive="true"
      ></ins>
    </div>
  )
}