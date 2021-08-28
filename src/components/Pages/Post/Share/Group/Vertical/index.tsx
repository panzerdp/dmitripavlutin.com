import * as styles from './index.module.scss';

import ShareSocialFacebook from 'components/Pages/Post/Share/Social/Facebook';
import PostShareSocialTwitter from 'components/Pages/Post/Share/Social/Twitter';
import PostShareSocialGithubStar from 'components/Pages/Post/Share/Social/GitHubStar';

interface ShareGroupVerticalProps {
  siteInfo: SiteInfo;
  url: string;
  text: string;
  tags: Tags;
  show: boolean;
  twitterName: string;
}

export default function ShareGroupVertical({ siteInfo, url, text, tags, show, twitterName }: ShareGroupVerticalProps) {
  const sharedProps = {
    url,
    text,
    tags,
  };
  return (
    <div className={`${styles.verticalGroup} ${show ? styles.show : ''}`}>
      <PostShareSocialTwitter {...sharedProps} twitterName={twitterName} />
      <ShareSocialFacebook {...sharedProps} />
      <PostShareSocialGithubStar repositoryUrl={siteInfo.repositoryUrl} />
    </div>
  );
}
