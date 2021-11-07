import { graphql } from 'gatsby';

import ExcerptsListTemplate from 'components/Pages/ExcerptsList/Template';
import { ExcerptsListQuery } from 'graphql-types';
import { toPostImageFluid, toPostImageFixed } from 'utils/mapper';

interface ExcerptsFetchProps {
  data: ExcerptsListQuery;
  pageContext: {
    currentPage: number;
    pagesSum: number;
  };
}

export default function ExcerptsFetch({
  data: {
    site: {
      siteMetadata: {
        featured: {
          popularPostsByCategory
        }        
      },
    },
    allMarkdownRemark,
    popularPostsMarkdown
  },
  pageContext,
}: ExcerptsFetchProps) {
  const popularPosts = popularPostsMarkdown.edges.map(toPostImageFixed);
  const popularPlainPostsByCategory = popularPostsByCategory.map(({ category, slugs }) => {
    return {
      category,
      plainPosts: slugs.map(popularSlug => popularPosts.find(({ slug }) => popularSlug === slug))
    };
  });
  return (
    <ExcerptsListTemplate
      posts={allMarkdownRemark.edges.map(toPostImageFluid)}
      currentPage={pageContext.currentPage}
      pagesSum={pageContext.pagesSum}
      popularPostsByCategory={popularPlainPostsByCategory}
    />
  );
}

export const pageQuery = graphql`
  query ExcerptsList($skip: Int, $limit: Int, $popularPostsSlugs: [String]!) {
    site {
      siteMetadata {
        featured {
          popularPostsByCategory {
            category
            slugs
          }
        }
      }
    }
    popularPostsMarkdown: allMarkdownRemark(filter: { frontmatter: { slug: { in: $popularPostsSlugs } } }) {
      edges {
        node {
          frontmatter {
            ...Post
            thumbnail {	
              childImageSharp {	
                gatsbyImageData(width: 180, height: 100, quality: 90, layout: FIXED)
              }	
            }
          }
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___published], order: DESC }
      filter: { frontmatter: { type: { eq: "post" } } }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          frontmatter {
            ...Post
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 650, height: 360, quality: 90, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;
