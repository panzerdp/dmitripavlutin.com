import React from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'query-string';

import ShareButton from 'components/Share/Button';
import styles from './index.module.scss';

const SHARE_REDDIT = 'https://www.reddit.com/submit';

export default function ShareSocialReddit({ url }) {
  const shareUrl = SHARE_REDDIT + '?' + stringify({
    url
  });
  return (
    <ShareButton
      title="Submit to Reddit"
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.reddit}
    />
  );
}

ShareSocialReddit.propTypes = {
  url: PropTypes.string
};