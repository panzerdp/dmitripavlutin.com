import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import TagMetaTags from '@tag/Meta/Tags';
import Layout from 'components/Layout/Container';
import SimpleList from 'components/Pages/Common/Simple/List';

export default function Tag({ pageContext: { tag }, data }) {
  return (
    <Layout>
      <TagMetaTags tag={tag} />
      <h1>&quot;{tag}&quot; posts</h1>
      <SimpleList edges={data.allMarkdownRemark.edges} />
    </Layout>
  );
}

Tag.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object
};

export const pageQuery = graphql`
  query TagPostsQuery($tag: String!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { 
        fields: [frontmatter___published], 
        order: DESC 
      }, 
      filter: { 
        frontmatter: { 
          tags: { 
            eq: $tag 
          },
          draft: {
            eq: false
          }
        } 
      }
    ) {
      edges {
        node {
          frontmatter {
            publishedDate: published(formatString: "DD MMMM, YYYY")
            title
            description
            slug
            tags
          }
        }
      }
    }
  }
`;