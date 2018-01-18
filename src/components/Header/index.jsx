import React from 'react';
import Link from 'gatsby-link';

import styles from './index.module.scss';

export default function Header() {
  return (
    <header>
      <Link to="/">Home</Link>
      <div className={styles.autor}>
        <div className={styles.specialist}>
          <img
            className={styles.picture}
            src="https://www.gravatar.com/avatar/0d57a57d8807ebc70e24b46f6d9e3a36?s=250&d=mm&r=x"
          />
          <p className={styles.software}>Dmitri Pavlutin</p>
          <p className={styles.speciality}>JavaScript and React</p>
        </div></div>
    </header>
  );
}