import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import 'normalize.css/normalize.css';
import './global.scss';
import styles from './index.module.scss';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Template({ children, data }) {
  return (
    <div className={styles.container}>
      <Helmet>
        <link href="//fonts.googleapis.com/css?family=Rosario:700|Crimson+Text:400,400i,600" rel="stylesheet" type="text/css" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </Helmet>
      <Header />
      <main className={styles.main}>
        {children()}
      </main>
      <Footer />
    </div>

  );
}