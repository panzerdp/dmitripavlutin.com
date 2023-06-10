import * as styles from './index.module.scss'

import ShareGroupVertical from 'components/Pages/Post/Share/Group/Vertical'
import { PostPlain } from 'typings/post'

interface PostLeftSidebarProps {
  post: PostPlain;
  showShareButtons: boolean;
}

export default function PostLeftSidebar({ post, showShareButtons }: PostLeftSidebarProps) {
  return (
    <div className={styles.leftSidebar}>
      <ShareGroupVertical post={post} show={showShareButtons} />
    </div>
  )
}
