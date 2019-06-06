import * as React from 'react';

import styles from './index.module.scss';

import ShareSocialFacebook from 'components/Pages/Post/Share/Social/Facebook';
import ShareSocialReddit from 'components/Pages/Post/Share/Social/Reddit';
import ShareSocialTwitter from 'components/Pages/Post/Share/Social/Twitter';

interface ShareButtonsHorizontalProps {
  url: string;
  text: string;
  tags: Tags;
}

export default function ShareButtonsHorizontal(props: ShareButtonsHorizontalProps) {
  return (
    <div className={styles.horizontalGroup}>
      <ShareSocialTwitter {...props} />
      <ShareSocialFacebook {...props} />
      <ShareSocialReddit {...props} />
    </div>
  );
}
