import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import styles from './index.module.scss';

export default function Tag({ name }) {
  const tagClassByName = styles['tag-' + name.toLowerCase()];
  return (
    <div 
      className={`${styles.tag} ${tagClassByName}`}
    >
      {name}
    </div>
  );
}

Tag.propTypes = {
  name: PropTypes.string
};