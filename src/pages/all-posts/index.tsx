import { graphql } from 'gatsby';
import * as React from 'react';

import PlainListAllTemplate from 'components/Pages/PlainListAll/Template';
import { PlainListAllQuery } from 'typings/graphql';
import { toPostExcerpt } from 'utils/mapper';

interface PlainListAllFetchProps {
  data: PlainListAllQuery;
}

export default function PlainListAllFetch({ data }: PlainListAllFetchProps) {
  return <PlainListAllTemplate posts={data.allMarkdownRemark.edges.map(toPostExcerpt)} />;
}

export const pageQuery = graphql`
  query PlainListAll {
    allMarkdownRemark(
      sort: { fields: [frontmatter___published], order: DESC }
      filter: { frontmatter: { type: { eq: "post" } } }
    ) {
      edges {
        node {
          frontmatter {
            ...Post
          }
        }
      }
    }
  }
`;
