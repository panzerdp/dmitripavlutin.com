import { graphql, StaticQuery } from 'gatsby';

import { AboutAuthorQuery } from 'graphql-types';
import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface AboutAuthorFetchResult {
  authorInfo: AuthorInfo;
  authorProfilePictureSmall: IGatsbyImageData;
  authorProfilePictureBig: IGatsbyImageData;
}

interface AboutAuthorFetchProps {
  render(result: AboutAuthorFetchResult): React.ReactNode;
}

export default function AboutAuthorFetch({ render }: AboutAuthorFetchProps) {
  return (
    <StaticQuery
      query={graphql`
        query AboutAuthor {
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
        }
      `}
      render={(data: AboutAuthorQuery) => {
        const {
          authorProfilePictureBig,
          authorProfilePictureSmall,
          site: {
            siteMetadata: { authorInfo },
          },
        } = data;
        return render({
          authorInfo,
          authorProfilePictureSmall: authorProfilePictureSmall.childImageSharp.gatsbyImageData,
          authorProfilePictureBig: authorProfilePictureBig.childImageSharp.gatsbyImageData,
        });
      }}
    />
  );
}
