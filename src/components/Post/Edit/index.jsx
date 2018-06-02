import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

export default function PostEdit({ url }) {
  return (
    <div className={styles.postEdit}>
      <a href={url} target="_blank">
        <img alt="GitHub Logo" src="/github.svg" />
        <span>Edit on GitHub</span>
      </a>
    </div>
  );
}

PostEdit.propTypes = {
  url: PropTypes.string
};