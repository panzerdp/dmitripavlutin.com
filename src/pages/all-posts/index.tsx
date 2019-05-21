import { graphql } from 'gatsby';
import * as React from 'react';

import PlainListAllTemplate from 'components/Pages/PlainListAll/Template';

interface PlainListAllFetchProps {
  data: any;
}

export default function PlainListAllFetch({ data }: PlainListAllFetchProps) {
  return <PlainListAllTemplate posts={data.allMarkdownRemark.edges.map(nodeToPostExcerpt)} />;
}

function nodeToPostExcerpt({ node: { frontmatter } }: any): PostExcerpt {
  return {
    ...frontmatter,
    thumbnail: frontmatter.thumbnail.childImageSharp.fluid,
  };
}

export const pageQuery = graphql`
  query AllPostsQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___published], order: DESC }
      filter: { frontmatter: { draft: { eq: false } } }
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
