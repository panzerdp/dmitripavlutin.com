import { graphql } from 'gatsby';
import * as React from 'react';

import PlainListByTagTemplate from 'components/Pages/PlainListByTag/Template';

interface PlainListByTagProps {
  pageContext: {
    tag: string;
  };
  data: any;
}

export default function PlainListByTagFetch({ pageContext: { tag }, data }: PlainListByTagProps) {
  return <PlainListByTagTemplate tag={tag} posts={data.allMarkdownRemark.edges.map(nodeToPostExcerpt)} />;
}

function nodeToPostExcerpt({ node: { frontmatter } }: any): PostExcerpt {
  return {
    ...frontmatter,
    thumbnail: frontmatter.thumbnail.childImageSharp.fluid,
  };
}

export const pageQuery = graphql`
  query TagPostsQuery($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___published], order: DESC }
      filter: { frontmatter: { tags: { eq: $tag }, draft: { eq: false } } }
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
