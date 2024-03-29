import Tag from 'components/Tag'
import { formatDate } from 'utils/date'
import * as styles from './index.module.scss'

interface PostSubheaderProps {
  post: PostPlain;
}

export default function PostSubheader({ post }: PostSubheaderProps) {
  return (
    <div className={styles.subheader}>
      <div className={styles.line}>
        <div className={styles.tags}>{post.tags.map(mapTag)}</div>
        <div className={styles.right}>
          <span className={styles.published}>{formatDate(post.published)}</span>
        </div>
      </div>
    </div>
  )
}

function mapTag(tagName: string) {
  return <Tag tag={tagName} key={tagName} />
}
