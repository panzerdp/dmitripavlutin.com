import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

import ShareSocialTwitter from 'components/Share/Social/Twitter';
import ShareSocialFacebook from 'components/Share/Social/Facebook';
import ShareSocialReddit from 'components/Share/Social/Reddit';

export default function ShareButtonsVertical({ url, text, tags, className }) {
  const shareProps = {
    url,
    text,
    tags
  };
  return (
    <div className={`${styles.verticalGroup} ${className}`}>
      <ShareSocialTwitter {...shareProps} />
      <ShareSocialFacebook {...shareProps} />
      <ShareSocialReddit {...shareProps} />
    </div>
  );
}

ShareButtonsVertical.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string,
  tags: PropTypes.array,
  className: PropTypes.string
};