import React, { Fragment } from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import Img from "gatsby-image";

import ArticleExcerpt from '../components/ArticleExcerpt';

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    return (
      <Fragment>
        <Helmet title={siteTitle} />
        {this.getArticleExcerpts()}
      </Fragment>
    );
  }

  getArticleExcerpts() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges');
    return posts.map(function({ node }) {
      return <ArticleExcerpt key={node.fields.slug} node={node} />;
    });
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 200)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            thumbnail {
              childImageSharp {
                resize(width: 800, height: 300, quality: 90) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;
