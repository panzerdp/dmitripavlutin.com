import { graphql } from 'gatsby';

import PlainListByTagTemplate from 'components/Pages/PlainListByTag/Template';
import { PlainListByTagQuery } from 'graphql-types';
import { toPostPlain } from 'utils/mapper';

interface PlainListByTagProps {
  pageContext: {
    tag: string;
  };
  data: PlainListByTagQuery;
}

export default function PlainListByTagFetch({ pageContext: { tag }, data }: PlainListByTagProps) {
  return <PlainListByTagTemplate tag={tag} posts={data.allMarkdownRemark.edges.map(toPostPlain)} />;
}

export const pageQuery = graphql`
  query PlainListByTag($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___published], order: DESC }
      filter: { frontmatter: { tags: { eq: $tag }, type: { eq: "post" } } }
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
