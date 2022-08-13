import { useStaticQuery, graphql } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';

import { AuthorInfoAndPicturesQuery } from 'graphql-types';

export const useAuthorAndSiteInfo = () => {
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
          }
        }
        authorProfilePicture: file(relativePath: { eq: "louvre.jpg" }) {
          childImageSharp {
            gatsbyImageData(width: 300, quality: 90, layout: CONSTRAINED, formats: [AUTO, AVIF])
          }
        }
      }
    `
  );
  const imageData = data.authorProfilePicture.childImageSharp.gatsbyImageData;
  return {
    author: {
      info: data.site.siteMetadata.authorInfo,
      profilePicture: imageData,
      profilePictureSrc: getSrc(imageData)
    },
    site: data.site.siteMetadata.siteInfo
  }
}