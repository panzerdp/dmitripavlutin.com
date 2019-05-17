import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { TO_PAGE } from 'routes/path';

interface MetaPaginatorProps {
  pagesSum: number;
  currentPage: number;
  siteUrl: string;
}

export default class MetaPaginator extends Component<MetaPaginatorProps> {
  render() {
    return (
      <Helmet>
        {this.prev()}
        {this.next()}
      </Helmet>
    );
  }

  prev() {
    const { currentPage } = this.props;
    if (currentPage === 1) {
      return null;
    }
    return <link rel="prev" href={this.pageToUrl(currentPage - 1)} />;
  }

  next() {
    const { pagesSum, currentPage } = this.props;
    if (currentPage === pagesSum) {
      return null;
    }
    return <link rel="next" href={this.pageToUrl(currentPage + 1)} />;
  }

  pageToUrl(page: number) {
    const { siteUrl } = this.props;
    if (page === 1) {
      return siteUrl;
    }
    return `${siteUrl}/${TO_PAGE({ page })}`;
  }
}