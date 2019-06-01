import * as React from 'react';
import Helmet from 'react-helmet';

import { TO_PAGE } from 'routes/path';

interface MetaPaginatorProps {
  pagesSum: number;
  currentPage: number;
  siteUrl: string;
}

export default class MetaPaginator extends React.Component<MetaPaginatorProps> {
  public render() {
    return (
      <Helmet>
        {this.prev()}
        {this.next()}
      </Helmet>
    );
  }

  public prev() {
    const { currentPage } = this.props;
    if (currentPage === 1) {
      return null;
    }
    return <link rel="prev" href={this.pageToUrl(currentPage - 1)} />;
  }

  public next() {
    const { pagesSum, currentPage } = this.props;
    if (currentPage === pagesSum) {
      return null;
    }
    return <link rel="next" href={this.pageToUrl(currentPage + 1)} />;
  }

  public pageToUrl(page: number) {
    const { siteUrl } = this.props;
    if (page === 1) {
      return siteUrl;
    }
    return `${siteUrl}${TO_PAGE({ page })}`;
  }
}
