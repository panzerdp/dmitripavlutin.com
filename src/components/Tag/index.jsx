import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import slugify from 'voca/slugify';

import styles from './index.module.scss';

export default function Tag({ name }) {
  return (
    <Link to={`/tag/${slugify(name)}`} className={styles.tag}>
      {name}
    </Link>
  );
}

Tag.propTypes = {
  name: PropTypes.string
};