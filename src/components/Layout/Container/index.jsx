import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from "gatsby";

import 'normalize.css/normalize.css';
import styles from './index.module.scss';

import LayoutMetaTags from 'components/Layout/Meta/Tags';
import LayoutHeader from 'components/Layout/Header';
import LayoutFooter from 'components/Layout/Footer';

export default class LayoutContainer extends Component {
  render() {
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
              title
              description
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
      `}
        render={this.renderContent}
      />
    );
  }

  renderContent = (data) => {
    const { site: { siteMetadata } } = data;
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <LayoutMetaTags siteMetadata={siteMetadata} />
        <LayoutHeader
          pictureResolutions={data.file.childImageSharp.resolutions}
          speciality={siteMetadata.speciality}
        />
        <main className={styles.main}>
          {children}
        </main>
        <LayoutFooter profiles={siteMetadata.profiles} author={siteMetadata.author} />
      </div>
    );
  }
}

LayoutContainer.propTypes = {
  children: PropTypes.node
};