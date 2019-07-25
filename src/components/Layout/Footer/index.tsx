import Link from 'gatsby-link';
import * as React from 'react';

import { TO_ABOUT_ME, TO_ALL_POSTS, TO_INDEX, TO_NEWSLETTER, TO_RSS } from 'routes/path';
import styles from './index.module.scss';

const year = new Date().getFullYear();

interface FooterProps {
  authorInfo: AuthorInfo;
}

export function Footer({ authorInfo: { profiles, name, email } }: FooterProps) {
  return (
    <footer>
      <div className={styles.footerContent}>
        <div className={styles.copyright}>
          <div>
            © {year} {name}
          </div>
          <div className={styles.license}>
            Licensed under <a href="http://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
          </div>
        </div>
        <div className={styles.links}>
          <div className={styles.footerNavigation}>
            <Link to={TO_INDEX()}>Home</Link>
            <Link to={TO_NEWSLETTER()}>Newsletter</Link>
            <a href={TO_RSS()}>RSS</a>
            <Link to={TO_ALL_POSTS()}>All posts</Link>
            <Link to={TO_ABOUT_ME()}>About me</Link>
          </div>
          <div className={styles.follow}>
            <a href={`mailto:${email}`} title={`Send an email to ${name}`}>
              <img alt="Email address" src="/email.svg" />
            </a>
            <a href={profiles.twitter} title={`${name}'s Twitter profile`}>
              <img alt="Twitter profile" src="/twitter.svg" />
            </a>
            <a href={profiles.stackoverflow} title={`${name}'s Stackoverflow profile`}>
              <img alt="Stackoverflow profile" src="/stackoverflow.svg" />
            </a>
            <a href={profiles.github} title={`${name}'s Github profile`}>
              <img alt="Github profile" src="/github.svg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
