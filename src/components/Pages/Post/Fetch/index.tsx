import { graphql } from 'gatsby';

import PostTemplate from 'components/Pages/Post/Template';
import { PostBySlugQuery } from 'typings/graphql';
import { toPostImageFixed, toPostPlain } from 'utils/mapper';

interface PostTemplateFetchProps {
  data: PostBySlugQuery;
}

export default function PostTemplateFetch({ data }: PostTemplateFetchProps) {
  const { siteInfo, authorInfo, githubCommentsRepository, featured: { popularPostsByCategory } } = data.site.siteMetadata;
  const { markdownRemark, recommendedPostsMarkdown, popularPostsMarkdown, authorProfilePicture } = data;
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
      siteInfo={siteInfo}
      authorInfo={authorInfo}
      postRepositoryFileUrl={postRepositoryFileUrl}
      post={post}
      recommendedPosts={recommendedPosts}
      popularPostsByCategory={popularPlainPostsByCategory}
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

  query PostBySlug($slug: String!, $recommended: [String]!, $popularPostsSlugs: [String]!) {
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
