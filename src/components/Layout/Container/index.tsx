import * as React from 'react';

import 'normalize.css/normalize.css';
import styles from './index.module.scss';

import LayoutFooter from 'components/Layout/Footer';
import LayoutHeader from 'components/Layout/Header';
import LayoutMetaTags from 'components/Layout/Meta/Tags';
import CarbonAdsMetaTags from 'components/CarbonAds/Meta/Tags';

interface LayoutContainerProps {
  children: React.ReactNode;
  siteInfo: SiteInfo;
  authorInfo: AuthorInfo;
  authorProfilePicture: FixedImage;
  carbonAdsService: CarbonAdsService;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

export default function LayoutContainer({
  children,
  siteInfo,
  authorInfo,
  authorProfilePicture,
  carbonAdsService,
  leftSidebar = null,
  rightSidebar = null,
}: LayoutContainerProps) {
  return (
    <>
      <LayoutMetaTags siteInfo={siteInfo} />
      <CarbonAdsMetaTags carbonAdsService={carbonAdsService} />
      <LayoutHeader authorProfilePicture={authorProfilePicture} authorInfo={authorInfo} siteInfo={siteInfo} />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
        <aside className={styles.leftSidebar}>{leftSidebar}</aside>
        <aside className={styles.rightSidebar}>{rightSidebar}</aside>
      </div>
      <LayoutFooter authorInfo={authorInfo} />
    </>
  );
}
