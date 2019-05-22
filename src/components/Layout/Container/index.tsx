import * as React from 'react';

import 'normalize.css/normalize.css';
import styles from './index.module.scss';

import LayoutFooter from 'components/Layout/Footer';
import LayoutHeader from 'components/Layout/Header';
import LayoutMetaTags from 'components/Layout/Meta/Tags';

interface LayoutContainerProps {
  children: React.ReactNode;
  siteInfo: SiteInfo;
  authorInfo: AuthorInfo;
  profilePicture: FixedImage;
}

export default function LayoutContainer({ children, siteInfo, authorInfo, profilePicture }: LayoutContainerProps) {
  return (
    <div className={styles.container}>
      <LayoutMetaTags siteInfo={siteInfo} />
      <LayoutHeader profilePicture={profilePicture} authorInfo={authorInfo} />
      <main className={styles.main}>{children}</main>
      <LayoutFooter authorInfo={authorInfo} />
    </div>
  );
}
