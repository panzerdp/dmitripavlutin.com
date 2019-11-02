import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import { AboutAuthorQuery } from 'typings/graphql';

interface AboutAuthorFetchResult {
  authorInfo: AuthorInfo;
  authorStats: AuthorStats;
  authorProfilePictureSmall: FixedImage;
  authorProfilePictureBig: FluidImage;
}

interface AboutAuthorFetchProps {
  render(result: AboutAuthorFetchResult): React.ReactNode;
}

/* istanbul ignore next */
export default function AboutAuthorFetch({ render }: AboutAuthorFetchProps) {
  return (
    <StaticQuery
      query={graphql`
        query AboutAuthor {
          site {
            siteMetadata {
              authorStats {
                ...AuthorStatsAll
              }
              authorInfo {
                ...AuthorInfoAll
              }
            }
          }
          authorProfilePictureSmall: file(relativePath: { eq: "louvre.jpg" }) {
            childImageSharp {
              fixed(width: 120, height: 120, quality: 100) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
          authorProfilePictureBig: file(relativePath: { eq: "louvre.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 350, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      `}
      render={(data: AboutAuthorQuery) => {
        const {
          authorProfilePictureBig,
          authorProfilePictureSmall,
          site: {
            siteMetadata: { authorInfo, authorStats },
          },
        } = data;
        return render({
          authorInfo,
          authorStats,
          authorProfilePictureSmall: authorProfilePictureSmall.childImageSharp.fixed,
          authorProfilePictureBig: authorProfilePictureBig.childImageSharp.fluid,
        });
      }}
    />
  );
}
