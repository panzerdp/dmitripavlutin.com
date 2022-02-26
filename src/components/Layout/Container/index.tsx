import 'normalize.css/normalize.css';
import * as styles from './index.module.scss';

import Footer from 'components/Layout/Footer';
import LayoutHeader from 'components/Layout/Header';
import LayoutMetaTags from 'components/Layout/Meta/Tags';

interface LayoutContainerProps {
  children: React.ReactNode;
  siteInfo: SiteInfo;
  authorInfo: AuthorInfo;
  authorProfilePicture: FixedImage;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

export default function LayoutContainer({
  children,
  siteInfo,
  authorInfo,
  authorProfilePicture,
  leftSidebar = null,
  rightSidebar = null,
}: LayoutContainerProps) {
  return (
    <>
      <LayoutMetaTags siteInfo={siteInfo} />
      <LayoutHeader authorProfilePicture={authorProfilePicture} siteInfo={siteInfo} />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
        <aside className={styles.leftSidebar}>{leftSidebar}</aside>
        <aside className={styles.rightSidebar}>{rightSidebar}</aside>
      </div>
      <Footer authorInfo={authorInfo} />
    </>
  );
}
