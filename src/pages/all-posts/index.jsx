import React from 'react';

import Layout from 'components/Layout/Container';
import PostList from 'components/Pages/AllPosts/List';

export default function AllPosts({ data }) {
  console.log(data);
  return (
    <Layout>
      <div>Hello!</div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query AllPostsQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___published], order: DESC }) {
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