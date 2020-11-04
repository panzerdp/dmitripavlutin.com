import Img from 'gatsby-image';
import Link from 'gatsby-link';
import { memo } from 'react';

import { TO_ABOUT_ME, TO_ALL_POSTS, TO_INDEX, TO_NEWSLETTER, TO_SEARCH } from 'routes/path';
import styles from './index.module.scss';

interface HeaderProps {
  authorProfilePicture: FixedImage;
  siteInfo: SiteInfo;
}

export function Header({ authorProfilePicture, siteInfo }: HeaderProps) {
  return (
    <header>
      <div className={styles.headerContent}>
        <Link to={TO_INDEX()}>
          <Img title="Home" fixed={authorProfilePicture} className={styles.picture} />
        </Link>
        <div className={styles.profileInfo}>
          <Link to={TO_INDEX()} className={styles.name}>
            {siteInfo.title}
          </Link>
          <div className={styles.speciality}>{siteInfo.description}</div>
        </div>
        <div className={styles.links}>
          <Link to={TO_ALL_POSTS()}>All posts</Link>
          <Link to={TO_SEARCH()}>Search</Link>
          <Link to={TO_ABOUT_ME()}>About</Link>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
