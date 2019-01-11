import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from "gatsby-image";

import styles from './index.module.scss';
import { TO_INDEX, TO_ALL_POSTS, TO_ABOUT } from 'routes/path';

export default function Header({ pictureResolutions, speciality }) {
  return (
    <header>
      <div className={styles.headerContent}>
        <Link to={TO_INDEX()}>
          <Img
            title="Home"
            resolutions={pictureResolutions}
            className={styles.picture}
          />
        </Link>
        <div className={styles.profileInfo}>
          <Link to={TO_INDEX()} className={styles.name}>Dmitri Pavlutin</Link>
          <div className={styles.speciality}>{speciality}</div>
        </div>
        <div className={styles.links}>
          <Link to={TO_ALL_POSTS()}>All posts</Link>
          <Link to={TO_ABOUT()}>About</Link>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  pictureResolutions: PropTypes.object,
  speciality: PropTypes.string
};