import React from 'react';
import Link from 'gatsby-link';

import 'normalize.css/normalize.css';
import styles from './index.module.scss';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Template({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {children()}
      </main>
      <Footer />
    </div>

  );
}