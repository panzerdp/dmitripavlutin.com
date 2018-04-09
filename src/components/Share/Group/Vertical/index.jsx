import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

import ShareButtonTwitter from 'components/Share/Button/Twitter';
import ShareButtonFacebook from 'components/Share/Button/Facebook';

export default function ShareButtonsVertical({ url, className }) {
  return (
    <div className={`${styles.verticalGroup} ${className}`}>
      <ShareButtonTwitter url={url} />
      <ShareButtonFacebook url={url} />
    </div>
  );
}

ShareButtonsVertical.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string
};