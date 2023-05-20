import 'normalize.css/normalize.css'
import * as styles from './index.module.scss'

import Footer from 'components/Layout/Footer'
import LayoutHeader from 'components/Layout/Header'
import LayoutMetaTags from 'components/Layout/Meta/Tags'
import LayoutMetaFontTags from 'components/Layout/Meta/FontTags'

interface LayoutContainerProps {
  children: React.ReactNode;
  siteInfo: SiteInfo;
  authorInfo: AuthorInfo;
  authorProfilePicture: FixedImage;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  postHeader?: JSX.Element;
}

export default function LayoutContainer({
  children,
  siteInfo,
  authorInfo,
  authorProfilePicture,
  leftSidebar = null,
  rightSidebar = null,
  postHeader = null
}: LayoutContainerProps) {
  return (
    <>
      <LayoutMetaFontTags />
      <LayoutMetaTags siteInfo={siteInfo} />
      <div className={styles.container}>
        <LayoutHeader authorProfilePicture={authorProfilePicture} siteInfo={siteInfo} />
        {postHeader}
        <main className={styles.main}>
          <div className={styles.left}>{leftSidebar}</div>
          {children}
          <div className={styles.right}>{rightSidebar}</div>
        </main>
        <Footer authorInfo={authorInfo} />
      </div>
    </>
  )
}
