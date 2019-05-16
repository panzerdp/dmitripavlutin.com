import React, { Component } from 'react';
import { graphql } from 'gatsby';

import ExcerptsTemplate from 'components/Pages/Excerpts/Template';

interface ExcerptsFetchProps {
  siteMetadata: SiteMetadata;
  pageContext: {
    currentPage: number;
    pagesSum: number;
    pathPrefix: string;
  }
}

export default function ExcerptsFetch({ siteMetadata, pageContext }: ExcerptsFetchProps ) {
  return (
    <ExcerptsTemplate 
      siteMetadata={siteMetadata}
      {...pageContext}
    />
  );
}

export const pageQuery = graphql`
  query IndexQuery($skip: Int, $limit: Int) {
    site {
      ...SiteInformation
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
            publishedDate: published(formatString: "DD MMMM, YYYY")
            title
            description
            slug
            tags
            thumbnail {
              childImageSharp {
                sizes(maxWidth: 720, maxHeight: 350, quality: 90) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;