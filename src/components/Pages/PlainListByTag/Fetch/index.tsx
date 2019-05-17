import React from 'react';
import { graphql } from 'gatsby';

import TagMetaTags from '../Meta/Tags';
import Layout from 'components/Layout/Container';
import SimpleList from 'components/Pages/Common/Simple/List';

interface PlainListByTagProps {
  pageContext: {
    tag: string;
  };
  data: any
}

export default function PlainListByTagFetch({ pageContext: { tag }, data }: PlainListByTagProps) {
  return (
    <Layout>
      <TagMetaTags tag={tag} />
      <h1>&quot;{tag}&quot; posts</h1>
      <SimpleList edges={data.allMarkdownRemark.edges} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query TagPostsQuery($tag: String!) {
    site {
      siteMetadata {
        ...SiteMetadataAll
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
            ...PostExcerpt
          }
        }
      }
    }
  }
`;