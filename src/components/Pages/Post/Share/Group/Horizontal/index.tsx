import * as styles from './index.module.scss';

import ShareSocialFacebook from 'components/Pages/Post/Share/Social/Facebook';
import PostShareSocialTwitter from 'components/Pages/Post/Share/Social/Twitter';
import PostShareSocialGithubStar from 'components/Pages/Post/Share/Social/GitHubStar';
import { useSiteMetadata } from 'hooks/useSiteMetadata';
import { PostPlain } from 'typings/post';
import { TO_POST } from 'routes/path';

interface ShareButtonsHorizontalProps {
  post: PostPlain;
}

export default function ShareButtonsHorizontal({ post }: ShareButtonsHorizontalProps) {
  const { author: { info: authorInfo }, site } = useSiteMetadata();
  const postUrl = site.url + TO_POST({ slug: post.slug });

  const sharedProps = {
    url: postUrl,
    text: post.title,
    tags: post.tags,
  };
  
  return (
    <div className={styles.horizontalGroup}>
      <PostShareSocialTwitter {...sharedProps} twitterName={authorInfo.nicknames.twitter} />
      <ShareSocialFacebook {...sharedProps} />
      <PostShareSocialGithubStar repositoryUrl={site.repositoryUrl} />
    </div>
  );
}
