import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from "gatsby";

import 'normalize.css/normalize.css';
import styles from './index.module.scss';

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
        <Helmet>
          <link href="//fonts.googleapis.com/css?family=Open+Sans:700|EB+Garamond:400,400i,600,700|Roboto+Mono:400" rel="stylesheet" type="text/css" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <meta name="HandheldFriendly" content="True" />
        </Helmet>
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