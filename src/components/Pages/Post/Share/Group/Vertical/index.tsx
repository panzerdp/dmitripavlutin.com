import * as styles from './index.module.scss'

import ShareSocialFacebook from 'components/Pages/Post/Share/Social/Facebook'
import PostShareSocialTwitter from 'components/Pages/Post/Share/Social/Twitter'
import { UrlToClipboard } from 'components/Pages/Post/Share/Social/UrlToClipboard'
import { PostPlain } from 'typings/post'
import { useSiteMetadata } from 'hooks/useSiteMetadata'
import { TO_POST } from 'routes/path'

interface ShareGroupVerticalProps {
  post: PostPlain;
  show: boolean;
}

export default function ShareGroupVertical({ post, show }: ShareGroupVerticalProps) {
  const { author: { info: authorInfo }, site } = useSiteMetadata()
  const postUrl = site.url + TO_POST({ slug: post.slug })

  const sharedProps = {
    url: postUrl,
    text: post.title,
    tags: post.tags,
  }

  return (
    <div className={`${styles.verticalGroup} ${show ? styles.show : ''}`}>
      <PostShareSocialTwitter {...sharedProps} twitterName={authorInfo.nicknames.twitter} />
      <ShareSocialFacebook {...sharedProps} />
      <UrlToClipboard url={postUrl} />
    </div>
  )
}
