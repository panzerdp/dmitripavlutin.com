import { RightSidebar } from 'shared/ui/RightSidebar'
import PopularPosts from 'components/Popular/Posts'
import SidebarItemsCommon from 'components/SidebarItems/Common'
import { PostPlain } from 'typings/post'
import { AffiliateBannerInPost } from 'features/affiliate'
import * as styles from './Right.module.scss'
import useVerticalScroll, { RelativePosition } from 'hooks/useVerticalScroll'
import classNames from 'classnames'

interface PostRightSidebarProps {
  popularPostsByCategory: {
    plainPosts: PostPlain[],
    category: string
  }[];
  tags: string[]
}

const SHOW_AFFILIATE_BANNER_AFTER = 1150

export default function PostRightSidebar({ popularPostsByCategory, tags }: PostRightSidebarProps) {
  const relativePosition = useVerticalScroll(SHOW_AFFILIATE_BANNER_AFTER)
  const className = classNames(styles.postRightSidebar__affiliateBanner, {
    [styles.postRightSidebar__affiliateBannerHidden]: relativePosition === RelativePosition.Above
  })

  return (
    <RightSidebar>
      <SidebarItemsCommon />
      <PopularPosts popularPostsByCategory={popularPostsByCategory} />
      <div className={className}>
        <AffiliateBannerInPost tags={tags} />
      </div>
    </RightSidebar>
  )
}
