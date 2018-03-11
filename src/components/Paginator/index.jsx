import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import R from 'ramda';

import styles from './index.module.scss';

export default function Paginator({ pagesSum, page, pathPrefix }) {
  const pageToPath = R.ifElse(R.equals(1), R.always('/'), R.pipe(R.toString, R.concat(pathPrefix)));
  const links = R.pipe(
    R.range,
    R.map(function(pageIteration) {
      return (
        <Link 
          to={pageToPath(pageIteration)}
          key={pageIteration}
        >
          {pageIteration}
        </Link>
      );
    })
  )(1, pagesSum + 1);
  return <div className={styles.paginator}>{links}</div>;
}

Paginator.propTypes = {
  pagesSum: PropTypes.number,
  page: PropTypes.number,
  pageToPath: PropTypes.func
};