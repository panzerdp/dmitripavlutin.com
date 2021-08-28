import * as styles from './index.module.scss';

import ShareSocialFacebook from 'components/Pages/Post/Share/Social/Facebook';
import PostShareSocialTwitter from 'components/Pages/Post/Share/Social/Twitter';
import PostShareSocialGithubStar from 'components/Pages/Post/Share/Social/GitHubStar';

interface ShareButtonsHorizontalProps {
  siteInfo: SiteInfo;
  url: string;
  text: string;
  tags: Tags;
  twitterName: string;
}

export default function ShareButtonsHorizontal({ siteInfo, url, text, tags, twitterName }: ShareButtonsHorizontalProps) {
  const shareProps = {
    url,
    text,
    tags,
  };
  return (
    <div className={styles.horizontalGroup}>
      <PostShareSocialTwitter {...shareProps} twitterName={twitterName} />
      <ShareSocialFacebook {...shareProps} />
      <PostShareSocialGithubStar repositoryUrl={siteInfo.repositoryUrl} />
    </div>
  );
}
