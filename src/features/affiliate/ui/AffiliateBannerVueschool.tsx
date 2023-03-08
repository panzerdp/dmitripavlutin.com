import { useEffect } from 'react';

interface Props {
  tags: string[]
}

import * as styles from './AffiliateBannerVueschool.module.scss'

export function AffiliateBannerVueschool({ tags }: Props) {
  const TAG_VUE = 'vue';
  const isVuePost = tags.includes(TAG_VUE)

  useEffect(() => {
    if (!isVuePost) {
      return;
    }
    window.BitterBrainsBanner = undefined;
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://vueschool.io/banner.js?affiliate=dmitripavlutin&type=inline'
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])


  if (!isVuePost) {
    return null
  }
  return <div className={styles.banner} id="bb-banner-container" />;
}