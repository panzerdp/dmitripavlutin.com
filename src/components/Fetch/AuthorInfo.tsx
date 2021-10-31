import { graphql, StaticQuery } from 'gatsby';

import { AuthorInfoAndPicturesQuery } from 'graphql-types';
import { IGatsbyImageData, getSrc } from 'gatsby-plugin-image';

export interface AuthorInfoFetchProps {
  authorInfo: AuthorInfo;
  pictures: {
    profileSmall: IGatsbyImageData;
    profileBig: IGatsbyImageData;
    thumbnail: IGatsbyImageData;
    thumbnailSrc: string;
  }
}

interface AboutAuthorFetchProps {
  render(result: AuthorInfoFetchProps): React.ReactNode;
}

export function AuthorInfoFetch({ render }: AboutAuthorFetchProps) {
  return (
    <StaticQuery
      query={graphql`
        query AuthorInfoAndPictures {
          site {
            siteMetadata {
              authorInfo {
                ...AuthorInfoAll
              }
            }
          }
          authorProfilePictureSmall: file(relativePath: { eq: "louvre.jpg" }) {
            childImageSharp {
              gatsbyImageData(width: 120, height: 120, quality: 100, layout: FIXED)
            }
          }
          authorProfilePictureBig: file(relativePath: { eq: "louvre.jpg" }) {
            childImageSharp {
              gatsbyImageData(width: 350, quality: 90, layout: CONSTRAINED)
            }
          }
          authorThumbnail: file(relativePath: { eq: "profile-picture.jpg" }) {
            childImageSharp {
              gatsbyImageData(width: 256, height: 256, quality: 100, layout: FIXED)
            }
          }
        }
      `}
      render={(data: AuthorInfoAndPicturesQuery) => {
        const {
          authorProfilePictureBig,
          authorProfilePictureSmall,
          authorThumbnail,
          site: {
            siteMetadata: { authorInfo },
          },
        } = data;
        return render({
          authorInfo,
          pictures: {
            profileSmall: authorProfilePictureSmall.childImageSharp.gatsbyImageData,
            profileBig: authorProfilePictureBig.childImageSharp.gatsbyImageData,
            thumbnail: authorThumbnail.childImageSharp.gatsbyImageData,
            thumbnailSrc: getSrc(authorThumbnail.childImageSharp.gatsbyImageData)
          }
        });
      }}
    />
  );
}
