import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import LayoutContainer from 'components/Layout/Container';
import { LayoutQuery } from 'typings/graphql';

interface LayoutFetchQueryProps {
  children: React.ReactNode;
}

/* istanbul ignore next */

export default function LayoutFetchQuery({ children }: LayoutFetchQueryProps) {
  return (
    <StaticQuery
      query={graphql`
        query Layout {
          file(relativePath: { eq: "profile-picture.jpg" }) {
            childImageSharp {
              resolutions(width: 64, height: 64, quality: 100) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
          site {
            siteMetadata {
              siteInfo {
                ...SiteInfoAll
              }
              authorInfo {
                ...AuthorInfoAll
              }
            }
          }
        }
      `}
      render={(data: LayoutQuery) => <LayoutFetch data={data}>{children}</LayoutFetch>}
    />
  );
}

interface LayoutFetchProps {
  data: LayoutQuery;
  children: React.ReactNode;
}

export function LayoutFetch({ data: { site, file }, children }: LayoutFetchProps) {
  return (
    <LayoutContainer
      siteInfo={site.siteMetadata.siteInfo}
      authorInfo={site.siteMetadata.authorInfo}
      authorProfilePicture={file.childImageSharp.resolutions}
    >
      {children}
    </LayoutContainer>
  );
}
