import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { StaticQuery } from "gatsby";

import 'normalize.css/normalize.css';
import styles from './index.module.scss';

import Header from 'components/Header';
import Footer from 'components/Footer';

import query from './query';

export default class Layout extends Component {
  render() {
    return (
      <StaticQuery
        query={query}
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
        <Header
          pictureResolutions={data.file.childImageSharp.resolutions}
          speciality={siteMetadata.speciality}
        />
        <main className={styles.main}>
          {children}
        </main>
        <Footer profiles={siteMetadata.profiles} author={siteMetadata.author} />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.func
};