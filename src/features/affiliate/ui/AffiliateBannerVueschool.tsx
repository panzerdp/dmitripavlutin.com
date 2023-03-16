import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  tags: string[]
}

import * as styles from './AffiliateBannerVueschool.module.scss'

export function AffiliateBannerVueschool({ tags }: Props) {
  const TAG_VUE = 'vue';
  const VUESCHOOL_SCRIPT_SRC = 'https://vueschool.io/banner.js?affiliate=dmitripavlutin&type=inline'
  const isVuePost = tags.includes(TAG_VUE)

  useEffect(() => {
    if (!isVuePost) {
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


  if (!isVuePost) {
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