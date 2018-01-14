import React from 'react';
import Link from 'gatsby-link';

import styles from './index.module.scss';

class Template extends React.Component {
  render() {
    console.log(styles);
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