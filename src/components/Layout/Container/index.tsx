import * as React from 'react';

import 'normalize.css/normalize.css';
import styles from './index.module.scss';

import LayoutFooter from 'components/Layout/Footer';
import LayoutHeader from 'components/Layout/Header';
import LayoutMetaTags from 'components/Layout/Meta/Tags';

interface LayoutContainerProps {
  children: React.ReactNode;
  siteMetadata: SiteMetadata;
  profilePicture: FixedImage;
}

export default function LayoutContainer({ children, siteMetadata, profilePicture }: LayoutContainerProps) {
  return (
    <div className={styles.container}>
      <LayoutMetaTags siteMetadata={siteMetadata} />
      <LayoutHeader profilePicture={profilePicture} speciality={siteMetadata.speciality} />
      <main className={styles.main}>{children}</main>
      <LayoutFooter profiles={siteMetadata.profiles} author={siteMetadata.author} />
    </div>
  );
}
