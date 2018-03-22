import React from 'react';
import Link from 'gatsby-link';

import styles from './index.module.scss';

export default function Footer({ profiles }) {
  return (
    <footer>
      <div className={styles.footerContent}>
        <div className={styles.left}>
          © 2018 Dmitri Pavlutin
        </div>
        <div className={styles.right}>
          <div class={styles.footerNavigation}>
            <Link to="/">Home</Link>
            <Link to="/all-posts">All posts</Link>
            <Link to="/about">About</Link>
          </div>
          <div class={styles.follow}>
            <span className={styles.followMe}>Follow me:</span>
            <a href={profiles.stackoverflow}><img src="/stackoverflow.svg" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}