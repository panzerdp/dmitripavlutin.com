import { graphql } from 'gatsby';

import ExcerptsListTemplate from 'components/Pages/ExcerptsList/Template';
import { ExcerptsListQuery } from 'typings/graphql';
import { toPostImageFluid, toPostPlain } from 'utils/mapper';

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
        siteInfo,
        featured: {
          popularPostsByCategory
        }        
      },
    },
    allMarkdownRemark,
    authorProfilePicture,
    popularPostsMarkdown
  },
  pageContext,
}: ExcerptsFetchProps) {
  const popularPosts = popularPostsMarkdown.edges.map(toPostPlain);
  const popularPlainPostsByCategory = popularPostsByCategory.map(({ category, slugs }) => {
    return {
      category,
      plainPosts: slugs.map(popularSlug => popularPosts.find(({ slug }) => popularSlug === slug))
    };
  });
  return (
    <ExcerptsListTemplate
      siteInfo={siteInfo}
      posts={allMarkdownRemark.edges.map(toPostImageFluid)}
      authorProfilePictureSrc={authorProfilePicture.childImageSharp.resize.src}
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
        siteInfo {
          ...SiteInfoAll
        }
        authorInfo {
          ...AuthorInfoAll
        }
        featured {
          popularPostsByCategory {
            category
            slugs
          }
        }
      }
    }
    authorProfilePicture: file(relativePath: { eq: "profile-picture.jpg" }) {
      childImageSharp {
        resize(width: 256, height: 256, quality: 100) {
          src
        }
      }
    }
    popularPostsMarkdown: allMarkdownRemark(filter: { frontmatter: { slug: { in: $popularPostsSlugs } } }) {
      edges {
        node {
          frontmatter {
            ...Post
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
                fluid(maxWidth: 650, maxHeight: 360, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
