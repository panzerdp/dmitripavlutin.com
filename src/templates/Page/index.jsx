import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import ArticleExcerpt from 'components/ArticleExcerpt';
import Paginator from 'components/Paginator';
import IndexMetaTags from 'components/Index/MetaTags';
import IndexMetaStructuredData from 'components/Index/MetaStructuredData';
import IndexMetaPaginator from 'components/Index/MetaPaginator';
import Layout from 'components/Layout';

export default class Page extends Component {
  render() {
    const siteUrl = this.props.data.site.siteMetadata.siteUrl;
    const paginatorProps = this.getPaginatorProps();
    return (
      <Layout>
        <IndexMetaTags {...this.props} />
        <IndexMetaStructuredData {...this.props} />
        <IndexMetaPaginator {...paginatorProps} siteUrl={siteUrl} />
        {this.getArticeExcerpts()}
        <Paginator {...paginatorProps} />
      </Layout>
    );
  }

  getPaginatorProps() {
    const { pageContext: { currentPage, pagesSum, pathPrefix } } = this.props;
    return {
      currentPage,
      pagesSum,
      pathPrefix
    };
  }

  getArticeExcerpts() {
    const edges = this.props.data.allMarkdownRemark.edges;
    return edges.map(function({ node: { frontmatter, excerpt } }, index) {
      return (
        <ArticleExcerpt
          key={index}
          excerpt={excerpt}
          slug={frontmatter.slug}
          title={frontmatter.title}
          sizes={frontmatter.thumbnail.childImageSharp.sizes}
          tags={frontmatter.tags}
          publishedDate={frontmatter.publishedDate}
        />
      );
    });
  }
}

Page.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object
};

export const pageQuery = graphql`
  query IndexQuery($skip: Int, $limit: Int) {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    authorProfilePicture: file(relativePath: { eq: "components/Layout/profile-picture.jpg" }) {
      childImageSharp {
        resize(width: 256, height: 256, quality: 100) {
          src
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___published], order: DESC }, skip: $skip, limit: $limit) {
      edges {
        node {
          excerpt(pruneLength: 250)
          frontmatter {
            publishedDate: published(formatString: "DD MMMM, YYYY")
            title
            slug
            tags
            thumbnail {
              childImageSharp {
                sizes(maxWidth: 720, maxHeight: 300, quality: 90) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;