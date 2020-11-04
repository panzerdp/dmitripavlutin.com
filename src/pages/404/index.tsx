import { graphql } from 'gatsby';

import Page404Template from 'components/Pages/404/Template';
import { Page404Query } from 'typings/graphql';

interface Page404FetchProps {
  data: Page404Query;
}

export default function Page404Fetch({ data }: Page404FetchProps) {
  const edges = data.allMarkdownRemark.edges;
  if (edges.length === 0) {
    throw new Error('404 page content not found. Create a markdown file which type is "404"');
  }
  return <Page404Template html={edges[0].node.html} />;
}

export const pageQuery = graphql`
  query Page404 {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "404" } } }) {
      edges {
        node {
          html
        }
      }
    }
  }
`;
