import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { StaticQuery } from "gatsby";

import Layout from 'components/Layout';
import ArticleExcerpt from 'components/ArticleExcerpt';
import Paginator from 'components/Paginator';
import IndexMetaTags from 'components/Index/MetaTags';
import IndexMetaStructuredData from 'components/Index/MetaStructuredData';
import IndexMetaPaginator from 'components/Index/MetaPaginator';
import query from './query';

const toArticleExcerpts = R.pipe(
  R.path(['data', 'allMarkdownRemark', 'edges']),
  R.addIndex(R.map)(function ({ node: { frontmatter }, node }, index) {
    return (
      <ArticleExcerpt
        key={index}
        excerpt={node.excerpt}
        slug={frontmatter.slug}
        title={frontmatter.title}
        sizes={frontmatter.thumbnail.childImageSharp.sizes}
        tags={frontmatter.tags}
        publishedDate={frontmatter.publishedDate}
      />
    );
  })
);

export default class Page extends Comment {
  render() {
    return (
      <StaticQuery
        query={query}
        render={this.renderContent}
      />
    );
  }

  renderContent = (data) => {
    const { pathContext: { currentPage, pagesSum, pathPrefix } } = this.props;
    const paginatorProps = {
      currentPage,
      pagesSum,
      pathPrefix
    };
    const siteUrl = data.site.siteMetadata.siteUrl;
    return (
      <Layout>
        <IndexMetaTags {...this.props} />
        <IndexMetaStructuredData {...this.props} />
        <IndexMetaPaginator {...paginatorProps} siteUrl={siteUrl} />
        {toArticleExcerpts(this.props)}
        <Paginator {...paginatorProps} />
      </Layout>
    );
  }
}

Page.propTypes = {
  pathContext: PropTypes.object
};