import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import styles from './index.module.scss';

export default function Paginator({ pagesSum, page, pageToPath }) {
  return (
    <div className={styles.paginator}>
      Paginator
    </div>
  );
}

Paginator.propTypes = {
  pagesSum: PropTypes.number,
  page: PropTypes.number,
  pageToPath: PropTypes.func
};