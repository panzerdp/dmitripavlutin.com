import React from 'react';
import { graphql } from 'gatsby';

import PostTemplate from 'components/Pages/Post/Template';

interface PostTemplateFetchProps {
  data: any;
}

export default function PostTemplateFetch({ data }: PostTemplateFetchProps) {
  const siteMetadata: SiteMetadata = data.site.siteMetadata;
  const { markdownRemark, recommendedPosts, authorProfilePicture } = data;
  const post: Post = {
    ...markdownRemark.frontmatter,
    html: markdownRemark.html,
    thumbnail: markdownRemark.frontmatter.thumbnail.childImageSharp.fluid
  };
  const postRelativePath = markdownRemark.fileAbsolutePath.split('/').slice(-3).join('/');
  const postRepositoryFileUrl = `${siteMetadata.repositoryUrl}/tree/master/${postRelativePath}`;
  const posts: PostExcerpt[] = recommendedPosts.edges.map(function(edge: any) {
    const { node: { frontmatter } } = edge;
    return {
      ...frontmatter,
      thumbnail: frontmatter.thumbnail.childImageSharp.fluid
    };
  });
  return (
    <PostTemplate
      siteMetadata={siteMetadata}
      postRepositoryFileUrl={postRepositoryFileUrl}
      post={post}
      recommendedPosts={posts}
      authorProfilePicture={authorProfilePicture.childImageSharp.resize}
    />
  ) 
}

export const pageQuery = graphql`
  fragment SiteMetadataAll on SiteSiteMetadata {
    title
    description
    speciality
    siteUrl
    repositoryUrl
    author
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

  query BlogPostBySlug($slug: String!, $recommended: [String]!) {
    site {
      siteMetadata {
        ...SiteMetadataAll
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
    recommendedPosts: allMarkdownRemark(
      filter: {
        frontmatter: { 
          slug: {
            in: $recommended
          }
        }
      }
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
