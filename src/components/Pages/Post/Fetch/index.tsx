import { graphql } from 'gatsby';
import * as React from 'react';

import PostTemplate from 'components/Pages/Post/Template';
import { PostBySlugQuery } from 'typings/graphql';
import { toPostExcerpt } from 'utils/mapper';

interface PostTemplateFetchProps {
  data: PostBySlugQuery;
}

export default function PostTemplateFetch({ data }: PostTemplateFetchProps) {
  const { siteInfo, authorInfo, carbonAdsService } = data.site.siteMetadata;
  const { markdownRemark, recommendedPosts, authorProfilePicture } = data;
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
  const posts = recommendedPosts.edges.map(toPostExcerpt);
  return (
    <PostTemplate
      siteInfo={siteInfo}
      authorInfo={authorInfo}
      carbonAdsService={carbonAdsService}
      postRepositoryFileUrl={postRepositoryFileUrl}
      post={post}
      recommendedPosts={posts}
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

  fragment PostExcerpt on MarkdownRemarkFrontmatter {
    title
    description
    published
    slug
    tags
    thumbnail {
      childImageSharp {
        fluid(maxWidth: 720, maxHeight: 350, quality: 90) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }

  query PostBySlug($slug: String!, $recommended: [String]!) {
    site {
      siteMetadata {
        siteInfo {
          ...SiteInfoAll
        }
        authorInfo {
          ...AuthorInfoAll
        }
        carbonAdsService {
          ...CarbonAdsServiceAll
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
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    recommendedPosts: allMarkdownRemark(filter: { frontmatter: { slug: { in: $recommended } } }) {
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
