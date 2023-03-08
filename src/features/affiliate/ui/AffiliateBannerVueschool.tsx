import Helmet from 'react-helmet';

interface Props {
  tags: string[]
}

import * as styles from './AffiliateBannerVueschool.module.scss'

export function AffiliateBannerVueschool({ tags }: Props) {
  const TAG_VUE = 'vue';
  if (!tags.includes(TAG_VUE)) {
    return null;
  }
  return (
    <>
      <Helmet>
        <script type="text/javascript" src="https://vueschool.io/banner.js?affiliate=dmitripavlutin&type=inline" async />
      </Helmet>
      <div className={styles.banner} id="bb-banner-container" />
    </>
  );
}