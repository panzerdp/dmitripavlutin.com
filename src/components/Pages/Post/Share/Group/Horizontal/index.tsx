import * as React from 'react';

import styles from './index.module.scss';

import ShareSocialFacebook from 'components/Pages/Post/Share/Social/Facebook';
import PostShareSocialTwitter from 'components/Pages/Post/Share/Social/Twitter';

interface ShareButtonsHorizontalProps {
  url: string;
  text: string;
  tags: Tags;
  twitterName: string;
}

export default function ShareButtonsHorizontal({ url, text, tags, twitterName }: ShareButtonsHorizontalProps) {
  const shareProps = {
    url,
    text,
    tags,
  };
  return (
    <div className={styles.horizontalGroup}>
      <PostShareSocialTwitter {...shareProps} twitterName={twitterName} />
      <ShareSocialFacebook {...shareProps} />
    </div>
  );
}
