import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import * as R from 'ramda';

import styles from './index.module.scss';
import { TO_INDEX, TO_PAGE } from 'routes/path';

export default class Paginator extends Component {
  constructor(props) {
    super(props);
    this.mapPageToLink = this.mapPageToLink.bind(this);
    this.toPrevLink = this.toPrevLink.bind(this);
    this.toNextLink = this.toNextLink.bind(this);
  }

  render() {
    const { pagesSum } = this.props;
    const links = R.pipe(
      R.range,
      R.map(this.mapPageToLink),
      R.prepend(this.toPrevLink()),
      R.append(this.toNextLink())
    )(1, pagesSum + 1);
    return <div className={styles.paginator}>{links}</div>;
  }

  mapPageToLink(page) {
    const { currentPage } = this.props;
    return (
      <Link
        to={this.pageToPath(page)}
        key={page}
        className={page === currentPage ? styles.selected : ''}
      >
        {page}
      </Link>
    );
  }

  toPrevLink() {
    const { currentPage } = this.props;
    if (currentPage === 1) {
      return <div key="prev" className={styles.nextPrev}>prev</div>;
    }
    return (
      <Link to={this.pageToPath(currentPage - 1)} key="prev" className={styles.nextPrev}>
        prev
      </Link>
    );
  }

  toNextLink() {
    const { pagesSum, currentPage } = this.props;
    if (currentPage === pagesSum) {
      return <div key="next" className={styles.nextPrev}>next</div>;
    }
    return (
      <Link to={this.pageToPath(currentPage + 1)} key="next" className={styles.nextPrev}>
        next
      </Link>
    );
  }

  pageToPath(page) {
    if (page === 1) {
      return TO_INDEX();
    }
    return TO_PAGE({ page });
  }
}

Paginator.propTypes = {
  pagesSum: PropTypes.number,
  currentPage: PropTypes.number
};