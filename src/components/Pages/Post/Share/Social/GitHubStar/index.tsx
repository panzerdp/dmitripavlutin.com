import ShareLink from '../../Button'
import * as styles from './index.module.scss'


interface PostShareGitHubStarProps {
  repositoryUrl: string;
}

export default function PostShareSocialGitHubStar({ repositoryUrl }: PostShareGitHubStarProps): JSX.Element {
  return (
    <ShareLink
      href={`${repositoryUrl}/stargazers`}
      title="Star on GitHub"
      className={styles.gitHubStar}
    />
  )
}