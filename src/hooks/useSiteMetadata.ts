import { useStaticQuery, graphql } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'

import { AuthorInfoAndPicturesQuery } from 'graphql-types'

export const useSiteMetadata = () => {
  const data = useStaticQuery<AuthorInfoAndPicturesQuery>(
    graphql`
      fragment SiteInfoAll on SiteSiteMetadataSiteInfo {
        title
        description
        metaTitle
        metaDescription
        url
        repositoryUrl
        githubCommentsRepository
        googleCustomSearchId
        
      }
    
      fragment AuthorInfoAll on SiteSiteMetadataAuthorInfo {
        name
        description
        job
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
      
      query AuthorInfoAndPictures {
        site {
          siteMetadata {
            authorInfo {
              ...AuthorInfoAll
            }
            siteInfo {
              ...SiteInfoAll
            }
            affiliates {
              inText {
                type
                enabled
                message
              }
              showVueschoolTopBanner
            }
          }
        }
        authorProfilePicture: file(relativePath: { eq: "louvre.jpg" }) {
          childImageSharp {
            gatsbyImageData(width: 300, quality: 60, layout: CONSTRAINED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    `
  )
  const imageData = data.authorProfilePicture.childImageSharp.gatsbyImageData
  const { siteMetadata } = data.site
  return {
    author: {
      info: siteMetadata.authorInfo,
      profilePicture: imageData,
      profilePictureSrc: getSrc(imageData),
    },
    site: siteMetadata.siteInfo,
    affiliates: siteMetadata.affiliates
  }
}