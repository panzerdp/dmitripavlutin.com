import { graphql } from 'gatsby';

export default graphql`
  query GatsbyImageSampleQuery {
    file(relativePath: { eq: "layouts/profile-picture.jpg" }) {
      childImageSharp {
        # Specify the image processing steps right in the query
        # Makes it trivial to update as your page's design changes.
        resolutions(width: 64, height: 64, quality: 100) {
          ...GatsbyImageSharpResolutions
        }
      }
    }
    site {
      siteMetadata {
        author
        speciality
        profiles {
          stackoverflow
          twitter 
          github
          linkedin
        }
      }
    }
  }
`;