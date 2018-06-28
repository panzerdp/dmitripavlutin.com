import { graphql } from 'gatsby';

export default graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
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
    authorProfilePicture: file(relativePath: { eq: "layouts/profile-picture.jpg" }) {
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
        thumbnail {
          childImageSharp {
            sizes(maxWidth: 720, maxHeight: 400, quality: 90) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;