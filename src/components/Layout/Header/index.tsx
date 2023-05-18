import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
// import { Link } from 'gatsby-link'
import { memo } from 'react'

import { TO_ABOUT_ME, TO_ALL_POSTS, TO_INDEX, TO_SEARCH } from 'routes/path'
import * as styles from './index.module.scss'
import { TO_RSS } from 'routes/path'

interface HeaderProps {
  authorProfilePicture: IGatsbyImageData;
  siteInfo: SiteInfo;
}

export function Header({ authorProfilePicture, siteInfo }: HeaderProps) {
  return (
    <header>
      <div className={styles.headerContent}>
        <a href={TO_INDEX()}>
          <GatsbyImage alt="Home" image={authorProfilePicture} className={styles.picture} />
        </a>
        <div className={styles.profileInfo}>
          <a href={TO_INDEX()} className={styles.name}>
            {siteInfo.title}
          </a>
          <div className={styles.speciality}>{siteInfo.description}</div>
        </div>
        <div className={styles.links}>
          <a href={TO_RSS()}>RSS</a>
          <a href={TO_SEARCH()}>Search</a>
          <a href={TO_ALL_POSTS()}>All posts</a>
          <a href={TO_ABOUT_ME()}>About</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
