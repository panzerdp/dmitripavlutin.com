import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

import ShareSocialTwitter from 'components/Pages/Post/Share/Social/Twitter';
import ShareSocialFacebook from 'components/Pages/Post/Share/Social/Facebook';
import ShareSocialReddit from 'components/Pages/Post/Share/Social/Reddit';

export default function ShareButtonsHorizontal({ url, text, tags }) {
  const shareProps = {
    url,
    text,
    tags
  };
  return (
    <div className={styles.horizontalGroup}>
      <ShareSocialTwitter {...shareProps} />
      <ShareSocialFacebook {...shareProps} />
      <ShareSocialReddit {...shareProps} />
    </div>
  );
}

ShareButtonsHorizontal.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string,
  tags: PropTypes.array
};