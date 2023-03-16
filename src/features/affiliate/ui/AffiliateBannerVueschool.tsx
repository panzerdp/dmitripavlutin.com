import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from 'hooks/useSiteMetadata';

interface Props {
  tags: string[]
}

import * as styles from './AffiliateBannerVueschool.module.scss'

export function AffiliateBannerVueschool({ tags }: Props) {
  const { affiliates: { showVueschoolTopBanner } } = useSiteMetadata()

  const TAG_VUE = 'vue';
  const VUESCHOOL_SCRIPT_SRC = 'https://vueschool.io/banner.js?affiliate=dmitripavlutin&type=inline'
  const showBanner = showVueschoolTopBanner && tags.includes(TAG_VUE)


  useEffect(() => {
    if (!showBanner) {
      return;
    }
    window.BitterBrainsBanner = undefined;
    const script = document.createElement('script')
    script.async = true
    script.src = VUESCHOOL_SCRIPT_SRC
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])


  if (!showBanner) {
    return null
  }
  return (
    <>
      <Helmet>
        <link rel="preload" href={VUESCHOOL_SCRIPT_SRC} />
      </Helmet>
      <div className={styles.banner} id="bb-banner-container" />
    </>
  )
}