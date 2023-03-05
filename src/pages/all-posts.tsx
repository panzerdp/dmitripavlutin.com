import { graphql } from 'gatsby';

import PlainListAllTemplate from 'components/Pages/PlainListAll/Template';
import { PlainListAllQuery } from 'graphql-types';
import { toPostPlain } from 'utils/mapper';

interface PlainListAllFetchProps {
  data: PlainListAllQuery;
}

export default function PlainListAllFetch({ data }: PlainListAllFetchProps) {
  return <PlainListAllTemplate posts={data.allMdx.edges.map(toPostPlain)} />;
}

export const pageQuery = graphql`
  query PlainListAll {
    allMdx(
      sort: {
        frontmatter: {
          published: DESC
        }
      }
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
