import Media from 'react-media'

import * as styles from './index.module.scss'

import ShareGroupVertical from 'components/Pages/Post/Share/Group/Vertical'
import { CarbonAdsSection } from 'features/carbonAds'
import { PostPlain } from 'typings/post'

interface PostLeftSidebarProps {
  post: PostPlain;
  showShareButtons: boolean;
}

export default function PostLeftSidebar({ post, showShareButtons }: PostLeftSidebarProps) {
  return (
    <div className={styles.leftSidebar}>
      <Media query="(min-width: 1251px)" defaultMatches={false}>
        <CarbonAdsSection />
      </Media>
      <ShareGroupVertical post={post} show={showShareButtons} />
    </div>
  )
}
