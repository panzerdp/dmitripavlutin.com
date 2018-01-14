import React from 'react';
import Link from 'gatsby-link';

import 'normalize.css/normalize.css';
import styles from './index.module.scss';



class Template extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <Link to='/'>Gatsby Starter Blog</Link>
        {children()}
      </div>
    );
  }
}

export default Template;