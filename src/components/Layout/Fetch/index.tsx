import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import LayoutContainer from 'components/Layout/Container';
import { LayoutQuery } from 'typings/graphql';

interface LayoutContainerProps {
  children: React.ReactNode;
}

export default class LayoutFetch extends React.Component<LayoutContainerProps> {
  public render() {
    return (
      <StaticQuery
        query={graphql`
          query Layout {
            file(relativePath: { eq: "profile-picture.jpg" }) {
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
        render={this.renderContent}
      />
    );
  }

  public renderContent = ({ site, file }: LayoutQuery) => {
    const { children } = this.props;
    return (
      <LayoutContainer
        siteInfo={site.siteMetadata.siteInfo}
        authorInfo={site.siteMetadata.authorInfo}
        authorProfilePicture={file.childImageSharp.resolutions}
      >
        {children}
      </LayoutContainer>
    );
  };
}
