import { graphql } from 'gatsby';

import PostTemplate from 'components/Pages/Post/Template';
import { PostBySlugQuery } from 'typings/graphql';
import { toPostImageFixed } from 'utils/mapper';

interface PostTemplateFetchProps {
  data: PostBySlugQuery;
}

export default function PostTemplateFetch({ data }: PostTemplateFetchProps) {
  const { siteInfo, authorInfo, githubCommentsRepository } = data.site.siteMetadata;
  const { markdownRemark, recommendedPosts, popularPosts, authorProfilePicture } = data;
  const post: PostDetailed = {
    ...markdownRemark.frontmatter,
    html: markdownRemark.html,
    thumbnail: markdownRemark.frontmatter.thumbnail.childImageSharp.fluid,
  };
  const postRelativePath = markdownRemark.fileAbsolutePath
    .split('/')
    .slice(-4)
    .join('/');
  const postRepositoryFileUrl = `${siteInfo.repositoryUrl}/edit/master/${postRelativePath}`;
  const recommended = recommendedPosts.edges.map(toPostImageFixed);
  const popular = popularPosts.edges.map(toPostImageFixed);
  return (
    <PostTemplate
      siteInfo={siteInfo}
      authorInfo={authorInfo}
      postRepositoryFileUrl={postRepositoryFileUrl}
      post={post}
      recommendedPosts={recommended}
      popularPosts={popular}
      authorProfilePictureSrc={authorProfilePicture.childImageSharp.resize.src}
      githubCommentsRepository={githubCommentsRepository}
    />
  );
}

export const pageQuery = graphql`
  fragment SiteInfoAll on SiteSiteMetadataSiteInfo {
    title
    description
    metaTitle
    metaDescription
    url
    repositoryUrl
  }

  fragment AuthorInfoAll on SiteSiteMetadataAuthorInfo {
    name
    description
    email
    jobTitle
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

  fragment AuthorStatsAll on SiteSiteMetadataAuthorStats {
    twitterFollowersCount
  }

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

  query PostBySlug($slug: String!, $recommended: [String]!, $popular: [String]!) {
    site {
      siteMetadata {
        siteInfo {
          ...SiteInfoAll
        }
        authorInfo {
          ...AuthorInfoAll
        }
        githubCommentsRepository
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
        ...Post
        recommended
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 650, maxHeight: 360, quality: 90) {
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
                fixed(width: 360, height: 200, quality: 90) {
                  ...GatsbyImageSharpFixed_withWebp
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
            thumbnail {
              childImageSharp {
                fixed(width: 70, height: 70, quality: 90) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
