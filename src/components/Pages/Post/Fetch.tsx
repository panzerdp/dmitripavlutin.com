import { graphql } from 'gatsby';

import PostTemplate from 'components/Pages/Post/Template';
import { PostBySlugQuery } from 'graphql-types';
import { toPostPlain } from 'utils/mapper';
import { PostDetailed } from 'typings/post';

interface PostTemplateFetchProps {
  data: PostBySlugQuery;
}

export default function PostTemplateFetch({ data }: PostTemplateFetchProps) {
  const { featured: { popularPostsByCategory } } = data.site.siteMetadata;
  const { markdownRemark, recommendedPostsMarkdown, popularPostsMarkdown } = data;
  const post: PostDetailed = {
    ...markdownRemark.frontmatter,
    html: markdownRemark.html,
    thumbnail: markdownRemark.frontmatter.thumbnail.childImageSharp.gatsbyImageData,
  };
  const postRelativePath = markdownRemark.fileAbsolutePath
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

  fragment Post on MarkdownRemarkFrontmatter {
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
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      fileAbsolutePath
      frontmatter {
        ...Post
        recommended
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 650, height: 360, quality: 90, layout: FULL_WIDTH)
          }
        }
      }
    }
    recommendedPostsMarkdown: allMarkdownRemark(filter: { frontmatter: { slug: { in: $recommended } } }) {
      edges {
        node {
          frontmatter {
            ...Post
          }
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
  }
`;
