import { PostPlain } from 'typings/post'
import ShareGroupHorizontal from '../Group/Horizontal'
import * as styles from './index.module.scss'

interface PostShareButtomProps {
  post: PostPlain;
}

export default function PostShareBottom({ post }: PostShareButtomProps) {
  return (
    <div className={styles.postShareBottom}>
      <h4>Like the post? Please share!</h4>
      <div className={styles.shareGroup}>
        <ShareGroupHorizontal post={post} />
      </div>
    </div>
  )
}
