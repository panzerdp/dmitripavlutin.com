import * as styles from './index.module.scss';

import ShareSocialFacebook from 'components/Pages/Post/Share/Social/Facebook';
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
    </div>
  );
}
