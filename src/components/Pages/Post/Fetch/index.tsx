import React from 'react';
import { graphql } from 'gatsby';

import PostTemplate from 'components/Pages/Post/Template';
import { postRelativePath } from './util';

interface PostTemplateFetchProps {
  data: any;
}

export default function PostTemplateFetch({ data }: PostTemplateFetchProps) {
  const siteMetadata: SiteMetadata = data.site.siteMetadata;
  const { markdownRemark, recommendedPosts } = data;

  const post: Post = {
    ...markdownRemark.frontmatter,
    html: markdownRemark.html,
    thumbnail: markdownRemark.frontmatter.thumbnail.childImageSharp
  };
  const postRepositoryFileUrl = `${siteMetadata.repositoryUrl}/tree/master/${postRelativePath(markdownRemark.fileAbsolutePath)}`;
  const posts = recommendedPosts.edges.map(function(edge: any) {
    const { node: { frontmatter } } = edge;
    return {
      ...frontmatter,
      thumbnail: frontmatter.thumbnail.childImageSharp
    };
  });

  return (
    <PostTemplate
      siteMetadata={siteMetadata}
      postRepositoryFileUrl={postRepositoryFileUrl}
      post={post}
      recommendedPosts={posts}
    />
  ) 
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $recommended: [String]!) {
    site {
      siteMetadata {
        author
        siteUrl
        repositoryUrl
        profiles {
          stackoverflow
          twitter
          linkedin
          github
          facebook
          googlePlus
        }
        nicknames {
          twitter
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
        publishedDate: published(formatString: "MMMM DD, YYYY")
        published(formatString: "YYYY-MM-DDTHH:mm:ssZ")
        modified(formatString: "YYYY-MM-DDTHH:mm:ssZ")
        tags
        recommended
        thumbnail {
          childImageSharp {
            sizes(maxWidth: 720, maxHeight: 350, quality: 90) {
              ...GatsbyImageSharpSizes
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
            title
            slug
            thumbnail {
              childImageSharp {
                sizes(maxWidth: 360, maxHeight: 175, quality: 90) {
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
