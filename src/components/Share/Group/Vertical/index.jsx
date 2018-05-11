import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

import ShareSocialTwitter from 'components/Share/Social/Twitter';
import ShareSocialFacebook from 'components/Share/Social/Facebook';

export default function ShareButtonsVertical({ url, className }) {
  return (
    <div className={`${styles.verticalGroup} ${className}`}>
      <ShareSocialTwitter url={url} />
      <ShareSocialFacebook url={url} />
    </div>
  );
}

ShareButtonsVertical.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string
};