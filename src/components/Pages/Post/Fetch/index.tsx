import { graphql } from 'gatsby';
import * as React from 'react';

import PostTemplate from 'components/Pages/Post/Template';
import { PostBySlugQuery } from 'typings/graphql';
import { toPostExcerpt, toPostPlain } from 'utils/mapper';

interface PostTemplateFetchProps {
  data: PostBySlugQuery;
}

export default function PostTemplateFetch({ data }: PostTemplateFetchProps) {
  const { siteInfo, authorInfo } = data.site.siteMetadata;
  const { markdownRemark, recommendedPosts, popularPosts, authorProfilePicture } = data;
  const post: Post = {
    ...markdownRemark.frontmatter,
    html: markdownRemark.html,
    thumbnail: markdownRemark.frontmatter.thumbnail.childImageSharp.fluid,
  };
  const postRelativePath = markdownRemark.fileAbsolutePath
    .split('/')
    .slice(-4)
    .join('/');
  const postRepositoryFileUrl = `${siteInfo.repositoryUrl}/tree/master/${postRelativePath}`;
  const recommended = recommendedPosts.edges.map(toPostExcerpt);
  const popular = popularPosts.edges.map(toPostPlain);
  return (
    <PostTemplate
      siteInfo={siteInfo}
      authorInfo={authorInfo}
      postRepositoryFileUrl={postRepositoryFileUrl}
      post={post}
      recommendedPosts={recommended}
      popularPosts={popular}
      authorProfilePictureSrc={authorProfilePicture.childImageSharp.resize.src}
    />
  );
}

export const pageQuery = graphql`
  fragment SiteInfoAll on SiteSiteMetadataSiteInfo {
    title
    description
    url
    repositoryUrl
  }

  fragment AuthorInfoAll on SiteSiteMetadataAuthorInfo {
    name
    description
    email
    profiles {
      stackoverflow
      twitter
      linkedin
      github
      facebook
    }
    nicknames {
      twitter
    }
  }

  fragment CarbonAdsServiceAll on SiteSiteMetadataCarbonAdsService {
    scriptSrc
    isEnabled
    isProductionMode
  }

  fragment Post on MarkdownRemarkFrontmatter {
    title
    description
    published
    slug
    tags
  }

  query PostBySlug($slug: String!, $recommended: [String]!, $popular: [String]!) {
    site {
      siteMetadata {
        siteInfo {
          ...SiteInfoAll
        }
        authorInfo {
          ...AuthorInfoAll
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
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      fileAbsolutePath
      frontmatter {
        title
        description
        slug
        published
        modified
        tags
        recommended
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 720, maxHeight: 350, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    recommendedPosts: allMarkdownRemark(filter: { frontmatter: { slug: { in: $recommended } } }) {
      edges {
        node {
          frontmatter {
            ...Post
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 720, maxHeight: 350, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    popularPosts: allMarkdownRemark(filter: { frontmatter: { slug: { in: $popular } } }) {
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
