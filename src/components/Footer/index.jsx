import React from 'react';
import Link from 'gatsby-link';

import styles from './index.module.scss';

const year = new Date().getFullYear();

export default function Footer({ profiles, author }) {
  return (
    <footer>
      <div className={styles.footerContent}>
        <div>
          © {year} {author}
        </div>
        <div>
          <div className={styles.footerNavigation}>
            <Link to="/">Home</Link>
            <Link to="/all-posts">All posts</Link>
            <Link to="/about">About</Link>
          </div>
          <div className={styles.follow}>
            <a href={profiles.twitter}><img alt={`${author} Twitter profile`} src="/twitter.svg" /></a>
            <a href={profiles.github}><img alt={`${author} Github profile`} src="/github.svg" /></a>
            <a href={profiles.stackoverflow}><img alt={`${author} Stackoverflow profile`} src="/stackoverflow.svg" /></a>
            <a href={profiles.linkedin}><img alt={`${author} LinkedIn profile`} src="/linkedin.svg" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}