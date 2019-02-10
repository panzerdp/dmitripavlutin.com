import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import ArticleExcerpt from 'components/Pages/Index/ArticleExcerpt';
import Paginator from 'components/Pages/Index/Paginator';
import MetaTags from 'components/Pages/Index/Meta/Tags';
import MetaStructuredData from 'components/Pages/Index/Meta/StructuredData';
import MetaPaginator from 'components/Pages/Index/Meta/Paginator';
import Layout from 'components/Layout/Container';

export default class Page extends Component {
  render() {
    const siteUrl = this.props.data.site.siteMetadata.siteUrl;
    const paginatorProps = this.getPaginatorProps();
    return (
      <Layout>
        <MetaTags {...this.props} />
        <MetaStructuredData {...this.props} />
        <MetaPaginator {...paginatorProps} siteUrl={siteUrl} />
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
    return edges.map(function({ node: { frontmatter } }, index) {
      return (
        <ArticleExcerpt
          key={index}
          slug={frontmatter.slug}
          title={frontmatter.title}
          description={frontmatter.description}
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
    authorProfilePicture: file(relativePath: { eq: "profile-picture.jpg" }) {
      childImageSharp {
        resize(width: 256, height: 256, quality: 100) {
          src
        }
      }
    }
    allMarkdownRemark(
      sort: { 
        fields: [frontmatter___published], 
        order: DESC 
      },
      filter: {
        frontmatter: { 
          draft: {
            eq: false
          }
        }
      },
      skip: $skip, 
      limit: $limit
    ) {
      edges {
        node {
          frontmatter {
            publishedDate: published(formatString: "DD MMMM, YYYY")
            title
            description
            slug
            tags
            thumbnail {
              childImageSharp {
                sizes(maxWidth: 720, maxHeight: 350, quality: 90) {
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