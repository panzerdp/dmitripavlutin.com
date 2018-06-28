import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const PAGE_PATH = 'page';

export default class IndexMetaPaginator extends Component {
  constructor(props) {
    super(props);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

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

  pageToUrl(page) {
    const { siteUrl } = this.props;
    if (page === 1) {
      return siteUrl;
    }
    return `${siteUrl}/${PAGE_PATH}/${page}`;
  }
}

IndexMetaPaginator.propTypes = {
  pagesSum: PropTypes.number,
  currentPage: PropTypes.number,
  siteUrl: PropTypes.string
};