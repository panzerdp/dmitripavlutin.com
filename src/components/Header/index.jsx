import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from "gatsby-image";

import styles from './index.module.scss';

export default function Header({ pictureResolutions }) {
  return (
    <header>
      <div className={styles.headerContent}>
        <Link to="/">
          <Img 
            title="Profile picture"
            resolutions={pictureResolutions} 
            className={styles.picture} 
          />
        </Link>
        <div className={styles.profileInfo}>
          <Link to="/" className={styles.name}>Dmitri Pavlutin</Link>
          <div className={styles.speciality}>JavaScript &amp; React developer</div>
        </div>
        <div className={styles.links}>
            <Link to="/all-posts/">All posts</Link>
            <Link to="/about/">About</Link>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  pictureResolutions: PropTypes.object
};