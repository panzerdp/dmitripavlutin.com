import React from 'react';
import { graphql } from 'gatsby';

import ExcerptsTemplate from 'components/Pages/Excerpts/Template';

interface ExcerptsFetchProps {
  data: any;
  pageContext: {
    currentPage: number;
    pagesSum: number;
    pathPrefix: string;
  }
}

function nodeToPostExcerpt({ node: { frontmatter } }: any): PostExcerpt {
  return {
    ...frontmatter,
    thumbnail: frontmatter.thumbnail.childImageSharp.fluid
  }
}

export default function ExcerptsFetch({ data: { site: { siteMetadata }, allMarkdownRemark } , pageContext }: ExcerptsFetchProps ) {
  return (
    <ExcerptsTemplate 
      siteMetadata={siteMetadata}
      posts={allMarkdownRemark.edges.map(nodeToPostExcerpt)}
      {...pageContext}
    />
  );
}

export const pageQuery = graphql`
  query ExcerptsQuery($skip: Int, $limit: Int) {
    site {
      ...SiteMetadata
    }
    authorProfilePicture: file(relativePath: { eq: "profile-picture.jpg" }) {
      childImageSharp {
        resize(width: 256, height: 256, quality: 100) {
          src
        }
      }
    }
    allMarkdownRemark(
      sort: { 
        fields: [frontmatter___published], 
        order: DESC 
      },
      filter: {
        frontmatter: { 
          draft: {
            eq: false
          }
        }
      },
      skip: $skip, 
      limit: $limit
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