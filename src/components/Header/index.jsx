import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import styles from './index.module.scss';

export default function Header() {
  return (
    <header>
      <div className={styles.headerContent}>
          <Link to="/">
            <img
              className={styles.picture}
              src="https://www.gravatar.com/avatar/0d57a57d8807ebc70e24b46f6d9e3a36?s=250&d=mm&r=x"
            />
          </Link>
        <div>
          <Link to="/" className={styles.name}>Dmitri Pavlutin</Link>
          <div className={styles.speciality}>JavaScript &amp; React developer</div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  profilePictureResolutions: PropTypes.array
};