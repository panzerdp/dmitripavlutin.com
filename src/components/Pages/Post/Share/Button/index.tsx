import React from 'react';

import styles from './index.module.scss';

export default function ShareButton({ className = '', ...restProps }) {
  return <a {...restProps} className={`${className} ${styles.share}`} />;
}