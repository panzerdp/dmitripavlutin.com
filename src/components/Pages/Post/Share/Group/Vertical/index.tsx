import * as styles from './index.module.scss';

import ShareSocialFacebook from 'components/Pages/Post/Share/Social/Facebook';
import PostShareSocialTwitter from 'components/Pages/Post/Share/Social/Twitter';
import PostShareSocialGithubStar from 'components/Pages/Post/Share/Social/GitHubStar';
import { PostPlain } from 'typings/post';
import { useAuthorAndSiteInfo } from 'hooks/useAuthorAndSiteInfo';
import { TO_POST } from 'routes/path';

interface ShareGroupVerticalProps {
  post: PostPlain;
  show: boolean;
}

export default function ShareGroupVertical({ post, show }: ShareGroupVerticalProps) {
  const { author: { info: authorInfo }, site } = useAuthorAndSiteInfo();
  const postUrl = site.url + TO_POST({ slug: post.slug });

  const sharedProps = {
    url: postUrl,
    text: post.title,
    tags: post.tags,
  };
  
  return (
    <div className={`${styles.verticalGroup} ${show ? styles.show : ''}`}>
      <PostShareSocialTwitter {...sharedProps} twitterName={authorInfo.nicknames.twitter} />
      <ShareSocialFacebook {...sharedProps} />
      <PostShareSocialGithubStar repositoryUrl={site.repositoryUrl} />
    </div>
  );
}
