import * as React from 'react';
import Img from 'gatsby-image';
import Link from 'gatsby-link';

import styles from './index.module.scss';
import { TO_ABOUT_ME } from 'routes/path';

interface AboutAuthorDetailed {
  authorInfo: AuthorInfo;
  authorProfilePicture: FluidImage;
}

export default function AboutAuthorDetailed({ authorInfo, authorProfilePicture }: AboutAuthorDetailed) {
  return (
    <div className={styles.aboutAuthor}>
      <div className={styles.authorInfo}>
        <Img fluid={authorProfilePicture} alt={authorInfo.name} />
        <h3>About me</h3>
        <div className={styles.description}>{authorInfo.description}</div>
      </div>
      <div className={styles.readMore}>
        <div className={styles.links}>
          <Link className={styles.icon} to={TO_ABOUT_ME()} title={`About ${authorInfo.name}`}>
            <img alt={`About ${authorInfo.name}`} src="/person.svg" />
          </Link>
          <Link className={styles.text} to={TO_ABOUT_ME()} title={`About ${authorInfo.name}`}>
            Read about me
          </Link>
        </div>
      </div>
    </div>
  );
}
