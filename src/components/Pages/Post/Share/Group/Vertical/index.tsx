import * as React from 'react';

import styles from './index.module.scss';

import ShareSocialFacebook from 'components/Pages/Post/Share/Social/Facebook';
import ShareSocialReddit from 'components/Pages/Post/Share/Social/Reddit';
import ShareSocialTwitter from 'components/Pages/Post/Share/Social/Twitter';

interface ShareButtonsVerticalProps {
  url: string;
  text: string;
  tags: Tags;
  className: string;
}

export default function ShareButtonsVertical({ url, text, tags, className }: ShareButtonsVerticalProps) {
  const shareProps = {
    url,
    text,
    tags,
  };
  return (
    <div className={`${styles.verticalGroup} ${className}`}>
      <ShareSocialTwitter {...shareProps} />
      <ShareSocialFacebook {...shareProps} />
      <ShareSocialReddit {...shareProps} />
    </div>
  );
}
