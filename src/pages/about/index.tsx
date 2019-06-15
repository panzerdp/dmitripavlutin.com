import { graphql } from 'gatsby';
import * as React from 'react';

import AboutTemplate from 'components/Pages/About/Template';
import { AboutQuery } from 'typings/graphql';

interface AboutFetchProps {
  data: AboutQuery;
}

export default function AboutFetch({ data }: AboutFetchProps) {
  const edges = data.allMarkdownRemark.edges;
  if (edges.length === 0) {
    throw new Error('About page content not found. Create a markdown file which type is "about"');
  }
  return <AboutTemplate authorInfo={data.site.siteMetadata.authorInfo} html={edges[0].node.html} />;
}

export const pageQuery = graphql`
  query About {
    site {
      siteMetadata {
        authorInfo {
          ...AuthorInfoAll
        }
      }
    }
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "about" } } }) {
      edges {
        node {
          html
        }
      }
    }
  }
`;
