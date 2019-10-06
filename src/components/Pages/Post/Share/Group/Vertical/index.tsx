import * as React from 'react';

import styles from './index.module.scss';

import ShareSocialFacebook from 'components/Pages/Post/Share/Social/Facebook';
import ShareSocialReddit from 'components/Pages/Post/Share/Social/Reddit';
import PostShareSocialTwitter from 'components/Pages/Post/Share/Social/Twitter';

interface ShareGroupVerticalProps {
  url: string;
  text: string;
  tags: Tags;
  show: boolean;
  twitterName: string;
}

export default function ShareGroupVertical({ url, text, tags, show, twitterName }: ShareGroupVerticalProps) {
  const sharedProps = {
    url,
    text,
    tags,
  };
  return (
    <div className={`${styles.verticalGroup} ${show ? styles.show : ''}`}>
      <PostShareSocialTwitter {...sharedProps} twitterName={twitterName} />
      <ShareSocialFacebook {...sharedProps} />
      <ShareSocialReddit {...sharedProps} />
    </div>
  );
}
