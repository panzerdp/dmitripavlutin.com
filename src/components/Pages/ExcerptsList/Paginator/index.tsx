import { Link } from 'gatsby-link';
import { Component } from 'react';

import { TO_INDEX, TO_PAGE } from 'routes/path';
import { generatePages } from './utils';
import * as styles from './index.module.scss';

const MAX_DISPLAYED_PAGES = 5;

interface PaginatorProps {
  pagesSum: number;
  currentPage: number;
}

export default class Paginator extends Component<PaginatorProps> {
  public render() {
    const { pagesSum, currentPage } = this.props;
    if (pagesSum === 0) {
      return null;
    }
    const links = [this.toPrevLink()];
    const pages = generatePages(currentPage, pagesSum, MAX_DISPLAYED_PAGES);
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      links.push(this.mapPageToLink(page));
      if (i < pages.length - 1 && page + 1 !== pages[i + 1]) {
        links.push(
          <div key={`gap-${page}`} className={styles.nextPrev}>
            [...]
          </div>
        );
      }
    }
    links.push(this.toNextLink());
    return <div className={styles.paginator}>{links}</div>;
  }

  private mapPageToLink = (page: number) => {
    const { currentPage } = this.props;
    return (
      <Link to={this.pageToPath(page)} key={page} className={page === currentPage ? styles.selected : ''}>
        {page}
      </Link>
    );
  };

  private toPrevLink() {
    const { currentPage } = this.props;
    if (currentPage === 1) {
      return (
        <div key="prev" className={styles.nextPrev}>
          prev
        </div>
      );
    }
    return (
      <Link to={this.pageToPath(currentPage - 1)} key="prev" className={styles.nextPrev}>
        prev
      </Link>
    );
  }

  private toNextLink() {
    const { pagesSum, currentPage } = this.props;
    if (currentPage === pagesSum) {
      return (
        <div key="next" className={styles.nextPrev}>
          next
        </div>
      );
    }
    return (
      <Link to={this.pageToPath(currentPage + 1)} key="next" className={styles.nextPrev}>
        next
      </Link>
    );
  }

  private pageToPath(page: number) {
    if (page === 1) {
      return TO_INDEX();
    }
    return TO_PAGE({ page });
  }
}
