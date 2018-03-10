import React, { Fragment, Component } from 'react';
import R from 'ramda';
import Helmet from 'react-helmet';

import ArticleExcerpt from '../../components/ArticleExcerpt';

const getPosts = R.path(['data', 'allMarkdownRemark', 'edges']);
const getSiteTitle = R.path(['data', 'site', 'siteMetadata', 'title']);
const getSlug = R.path(['node', 'frontmatter', 'slug']);
const getNode = R.path(['node']);

class Page extends Component {
  render() {
    const siteTitle = getSiteTitle(this.props);
    console.log(this.props.pathContext);
    return (
      <Fragment>
        <Helmet title={siteTitle} />
        {this.getArticleExcerpts()}
      </Fragment>
    );
  }

  getArticleExcerpts() {
    const { pathContext: { slugs } } = this.props;
    const containsSlug = R.partial(R.flip(R.contains), [slugs]);
    return R.pipe(
      getPosts,
      R.filter(R.pipe(getSlug, containsSlug)),
      R.map(this.edsgeToArticleExcerpt)
    )(this.props);
  }

  edsgeToArticleExcerpt(edge) {
    return <ArticleExcerpt key={getSlug(edge)} node={getNode(edge)} />;
  }
}

export default Page;

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
