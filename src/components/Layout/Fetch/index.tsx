import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import LayoutContainer from 'components/Layout/Container';
import { LayoutQuery } from 'typings/graphql';

interface LayoutFetchQueryProps {
  children: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

/* istanbul ignore next */

export default function LayoutFetchQuery({ children, leftSidebar, rightSidebar }: LayoutFetchQueryProps) {
  return (
    <StaticQuery
      query={graphql`
        query Layout {
          file(relativePath: { eq: "profile-picture.jpg" }) {
            childImageSharp {
              fixed(width: 64, height: 64, quality: 100) {
                ...GatsbyImageSharpFixed_withWebp
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
      render={(data: LayoutQuery) => (
        <LayoutFetch data={data} leftSidebar={leftSidebar} rightSidebar={rightSidebar}>
          {children}
        </LayoutFetch>
      )}
    />
  );
}

interface LayoutFetchProps {
  data: LayoutQuery;
  children: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

export function LayoutFetch({
  data: {
    site: { siteMetadata },
    file,
  },
  children,
  leftSidebar,
  rightSidebar,
}: LayoutFetchProps) {
  return (
    <LayoutContainer
      siteInfo={siteMetadata.siteInfo}
      authorInfo={siteMetadata.authorInfo}
      authorProfilePicture={file.childImageSharp.fixed}
      leftSidebar={leftSidebar}
      rightSidebar={rightSidebar}
    >
      {children}
    </LayoutContainer>
  );
}
