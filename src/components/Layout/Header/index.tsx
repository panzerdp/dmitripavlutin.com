import React from 'react';
import Link from 'gatsby-link';
import Img from "gatsby-image";

import styles from './index.module.scss';
import { TO_INDEX, TO_ALL_POSTS, TO_ABOUT } from 'routes/path';

interface HeaderProps {
  profilePicture: FixedImage;
  speciality: string;
}

export default function Header({ profilePicture, speciality }: HeaderProps) {
  return (
    <header>
      <div className={styles.headerContent}>
        <Link to={TO_INDEX()}>
          <Img
            title="Home"
            resolutions={profilePicture}
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