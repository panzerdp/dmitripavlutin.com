import React from 'react';

import styles from './index.module.scss';

import ShareSocialTwitter from 'components/Pages/Post/Share/Social/Twitter';
import ShareSocialFacebook from 'components/Pages/Post/Share/Social/Facebook';
import ShareSocialReddit from 'components/Pages/Post/Share/Social/Reddit';

interface ShareButtonsHorizontalProps {
  url: string;
  text: string;
  tags: Tags
}

export default function ShareButtonsHorizontal({ url, text, tags }: ShareButtonsHorizontalProps) {
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