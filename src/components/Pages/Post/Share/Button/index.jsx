import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

export default function ShareButton({ className = '', ...restProps }) {
  return <a {...restProps} className={`${className} ${styles.share}`} />;
}

ShareButton.propTypes = {
  className: PropTypes.string
};