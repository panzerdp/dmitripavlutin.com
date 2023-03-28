import { ShareButton } from '../Button'
import * as styles from './index.module.scss'

interface PostShareGitHubStarProps {
  url: string;
}

export function SharePostLinkToClipboard({ url }: PostShareGitHubStarProps): JSX.Element {
  return (
    <ShareButton
      title="Copy post link to clipboard"
      className={styles.linkToClipboard}
    />
  )
}