import { ShareLink } from '../../Button'
import * as styles from './index.module.scss'

export const URL_SHARE_REDDIT = 'https://www.reddit.com/submit'

interface PostShareSocialRedditProps {
  url: string;
  text: string;
}

export default function PostShareSocialReddit({ url, text }: PostShareSocialRedditProps) {
  const shareUrl = `${URL_SHARE_REDDIT}?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`
  return (
    <ShareLink
      title="Submit to Reddit"
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.reddit}
    />
  )
}
