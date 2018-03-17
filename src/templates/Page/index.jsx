import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import Helmet from 'react-helmet';

import ArticleExcerpt from 'components/ArticleExcerpt';
import Paginator from 'components/Paginator';

const getSiteTitle = R.path(['data', 'site', 'siteMetadata', 'title']);
const getSlug = R.path(['node', 'frontmatter', 'slug']);
const getNode = R.path(['node']);
const getPaginator = R.pipe(R.path(['pathContext']), R.pick(['currentPage', 'pagesSum', 'pathPrefix']));
const toArticleExcerpts = R.pipe(
  R.path(['data', 'allMarkdownRemark', 'edges']),
  R.map(edge => <ArticleExcerpt key={getSlug(edge)} node={getNode(edge)} />)
);

export default function Page(props) {
  return (
    <Fragment>
      <Helmet title={getSiteTitle(props)} />
      {toArticleExcerpts(props)}
      <Paginator {...getPaginator(props)} />
    </Fragment>
  );
}

Page.propTypes = {
  data: PropTypes.object,
  pathContext: PropTypes.object
};

export const pageQuery = graphql`
  query IndexQuery($skip: Int, $limit: Int) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, skip: $skip, limit: $limit) {
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
