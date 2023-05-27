import 'normalize.css/normalize.css'
import * as styles from './App.module.scss'

import { Footer } from './Footer'
import { Header } from './Header'
import { AppMetaTags } from '../meta/AppMetaTags'
import { graphql, useStaticQuery } from 'gatsby'
import type { AppQuery } from 'graphql-types'

interface AppProps {
  children: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  postHeader?: JSX.Element;
}

export function App({
  children,
  leftSidebar = null,
  rightSidebar = null,
  postHeader = null
}: AppProps) {
  const { site: { siteMetadata: { siteInfo, authorInfo } }, file } = useStaticQuery<AppQuery>(graphql`
    query App {
      file(relativePath: { eq: "face.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 64, height: 64, quality: 100, layout: FIXED, formats: [AUTO, WEBP])
        }
      }
      site {
        siteMetadata {
          siteInfo {
            ...SiteInfoAll
          }
          authorInfo {
            ...AuthorInfoAll
          }
        }
      }
    }`
  )
  return (
    <>
      <AppMetaTags siteInfo={siteInfo} />
      <div className={styles.container}>
        <Header authorProfilePicture={file.childImageSharp.gatsbyImageData} siteInfo={siteInfo} />
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
