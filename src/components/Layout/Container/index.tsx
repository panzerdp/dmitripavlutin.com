import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import 'normalize.css/normalize.css';
import styles from './index.module.scss';

import LayoutFooter from 'components/Layout/Footer';
import LayoutHeader from 'components/Layout/Header';
import LayoutMetaTags from 'components/Layout/Meta/Tags';

interface LayoutContainerProps {
  children: React.ReactNode;
}

export default class LayoutContainer extends React.Component<LayoutContainerProps> {
  public render() {
    return (
      <StaticQuery
        query={graphql`
          query GatsbyImageSampleQuery {
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
                ...SiteMetadataAll
              }
            }
          }
        `}
        render={this.renderContent}
      />
    );
  }

  public renderContent = ({ site: { siteMetadata }, file }: { site: { siteMetadata: SiteMetadata }; file: any }) => {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <LayoutMetaTags siteMetadata={siteMetadata} />
        <LayoutHeader profilePicture={file.childImageSharp.resolutions} speciality={siteMetadata.speciality} />
        <main className={styles.main}>{children}</main>
        <LayoutFooter profiles={siteMetadata.profiles} author={siteMetadata.author} />
      </div>
    );
  };
}
