import React, { Component } from 'react';
import Link from 'gatsby-link';

import styles from './index.module.scss';
import { TO_INDEX, TO_PAGE } from 'routes/path';

interface PaginatorProps {
  pagesSum: number;
  currentPage: number;
}

export default class Paginator extends Component<PaginatorProps> {
  render() {
    const { pagesSum } = this.props;
    const links = [this.toPrevLink()];
    for (let page = 1; page <= pagesSum; page++) {
      links.push(this.mapPageToLink(page));
    }
    links.push(this.toNextLink());
    return <div className={styles.paginator}>{links}</div>;
  }

  mapPageToLink(page: number) {
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

  pageToPath(page: number) {
    if (page === 1) {
      return TO_INDEX();
    }
    return TO_PAGE({ page });
  }
}