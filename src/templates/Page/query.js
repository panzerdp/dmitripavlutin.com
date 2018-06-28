import { graphql } from 'gatsby';

export default graphql`
  query IndexQuery($skip: Int, $limit: Int) {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    authorProfilePicture: file(relativePath: { eq: "layouts/profile-picture.jpg" }) {
      childImageSharp {
        resize(width: 256, height: 256, quality: 100) {
          src
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___published], order: DESC }, skip: $skip, limit: $limit) {
      edges {
        node {
          excerpt(pruneLength: 250)
          frontmatter {
            publishedDate: published(formatString: "DD MMMM, YYYY")
            title
            slug
            tags
            thumbnail {
              childImageSharp {
                sizes(maxWidth: 720, maxHeight: 300, quality: 90) {
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