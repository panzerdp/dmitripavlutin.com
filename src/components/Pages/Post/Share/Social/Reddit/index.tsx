import { stringify } from 'query-string';
import * as React from 'react';

import ShareButton from '../../Button';
import styles from './index.module.scss';

const SHARE_REDDIT = 'https://www.reddit.com/submit';

interface ShareSocialRedditProps {
  url: string;
  text: string;
}

export default function ShareSocialReddit({ url, text }: ShareSocialRedditProps) {
  const shareUrl =
    SHARE_REDDIT +
    '?' +
    stringify({
      url,
      title: text,
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
