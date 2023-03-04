import { graphql } from 'gatsby';

import PostTemplate from 'components/Pages/Post/Template';
import { PostBySlugQuery } from 'graphql-types';
import { toPostPlain } from 'utils/mapper';
import { PostDetailed } from 'typings/post';

interface PostTemplateFetchProps {
  data: PostBySlugQuery;
  children: JSX.Element;
}

export default function PostTemplateFetch({ data, children }: PostTemplateFetchProps) {
  const { featured: { popularPostsByCategory } } = data.site.siteMetadata;
  const { mdx, recommendedPostsMarkdown, popularPostsMarkdown } = data;
  console.log(children);
  const post: PostDetailed = {
    ...mdx.frontmatter,
    children,
    thumbnail: mdx.frontmatter.thumbnail.childImageSharp.gatsbyImageData,
  };
  const postRelativePath = mdx.internal.contentFilePath
    .split('/')
    .slice(-4)
    .join('/');
  const recommendedPosts = recommendedPostsMarkdown.edges.map(toPostPlain);
  const popularPosts = popularPostsMarkdown.edges.map(toPostPlain);
  const popularPlainPostsByCategory = popularPostsByCategory.map(({ category, slugs }) => {
    return {
      category,
      plainPosts: slugs.map(popularSlug => popularPosts.find(({ slug }) => popularSlug === slug))
    };
  });
  return (
    <PostTemplate
      postRelativePath={postRelativePath}
      post={post}
      recommendedPosts={recommendedPosts}
      popularPostsByCategory={popularPlainPostsByCategory}
    />
  );
}

export const pageQuery = graphql`
  fragment CarbonAdsServiceAll on SiteSiteMetadataCarbonAdsService {
    isEnabled
    isProductionMode
    scriptSrc
  }

  fragment Post on MdxFrontmatter {
    title
    description
    published
    modified
    slug
    tags
  }

  query PostBySlug($slug: String!, $recommended: [String]!, $popularPostsSlugs: [String]!) {
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
    mdx(frontmatter: { slug: { eq: $slug } }) {
      id
      internal {
        contentFilePath
      }
      frontmatter {
        ...Post
        recommended
        thumbnail {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1.8, quality: 60, width: 708, formats: [AUTO, AVIF], placeholder: BLURRED)
          }
        }
      }
    }
    recommendedPostsMarkdown: allMdx(filter: { frontmatter: { slug: { in: $recommended } } }) {
      edges {
        node {
          frontmatter {
            ...Post
          }
        }
      }
    }
    popularPostsMarkdown: allMdx(filter: { frontmatter: { slug: { in: $popularPostsSlugs } } }) {
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
