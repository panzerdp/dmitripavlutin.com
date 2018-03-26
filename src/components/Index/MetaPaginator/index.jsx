import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import Helmet from 'react-helmet';

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
    )
  }
  
  prev() {
    const { pagesSum, currentPage } = this.props;
    if (currentPage === 1) {
      return null;
    }
    return <link rel="prev" href={this.pageToPath(currentPage - 1)} />;
  }
  
  next() {
    const { pagesSum, currentPage } = this.props;
    if (currentPage === pagesSum) {
      return null;
    }
    return <link rel="next" href={this.pageToPath(currentPage + 1)} />;
  }

  pageToUrl(page) {
    const { siteUrl, pathPrefix } = this.props;
    if (page === 1) {
      return '/';
    }
    return this.props.pathPrefix + page;
  }
}

Paginator.propTypes = {
  pagesSum: PropTypes.number,
  currentPage: PropTypes.number,
  pathPrefix: PropTypes.string,
  siteUrl: PropTypes.string
};