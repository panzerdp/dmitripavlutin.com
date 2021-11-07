import { graphql } from 'gatsby';

import AboutTemplate from 'components/Pages/About/Template';
import { AboutQuery } from 'graphql-types';

interface AboutFetchProps {
  data: AboutQuery;
}

export default function AboutFetch({ data }: AboutFetchProps) {
  const edges = data.allMarkdownRemark.edges;
  if (edges.length === 0) {
    throw new Error('About me page content not found. Create a markdown file with the type "about-me"');
  }
  return <AboutTemplate html={edges[0].node.html} />;
}

export const pageQuery = graphql`
  query About {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "about-me" } } }) {
      edges {
        node {
          html
        }
      }
    }
  }
`;
