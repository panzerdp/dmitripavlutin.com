import React from 'react';
import Link from 'gatsby-link';

import styles from './index.module.scss';

export default function Header() {
  return (
    <header>
      <Link to="/" className={styles.headerContent}>
          <img
            className={styles.picture}
            src="https://www.gravatar.com/avatar/0d57a57d8807ebc70e24b46f6d9e3a36?s=250&d=mm&r=x"
          />
        <div>
          <Link to="/" className={styles.name}>Dmitri Pavlutin</Link>
          <div className={styles.speciality}>Likes JavaScript &amp; React</div>
        </div>
      </Link>
    </header>
  );
}