import React, { Fragment } from 'react';
import R from 'ramda';
import Helmet from 'react-helmet';

import ArticleExcerpt from '../components/ArticleExcerpt';

const getPosts = R.path(['data', 'allMarkdownRemark', 'edges']);
const getSiteTitle = R.path(['data', 'site', 'siteMetadata', 'title']);

class BlogIndex extends React.Component {
  render() {
    const siteTitle = getSiteTitle(this.props);
    return (
      <Fragment>
        <Helmet title={siteTitle} />
        {this.getArticleExcerpts()}
      </Fragment>
    );
  }

  getArticleExcerpts() {
    const posts = getPosts(this.props);
    return posts.map(function({ node }) {
      return <ArticleExcerpt key={node.frontmatter.slug} node={node} />;
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
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
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
