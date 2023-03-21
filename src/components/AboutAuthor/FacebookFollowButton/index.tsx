import * as styles from './index.module.scss'

interface FacebookFollowButtonProps {
  facebookPageUrl: string;
  authorName: string;
}

export default function FacebookFollowButton({
  facebookPageUrl,
  authorName,
}: FacebookFollowButtonProps): JSX.Element {
  const url = facebookPageUrl
  return (
    <div className={styles.widget}>
      <div className={styles.btnO}>
        <a
          className={`${styles.btn} ${styles.followButton}`}
          title={`Like ${authorName} Page on Facebook`}
          href={url}
        >
          <i></i>
          <span className={styles.label}>
            Like {authorName} Page
          </span>
        </a>
      </div>
    </div>
  )
}