import { GatsbyImage } from 'gatsby-plugin-image'
import Media from 'react-media'

import './code-hike.scss'

import * as styles from './index.module.scss'
import { PostPlain, PostDetailed } from 'typings/post'
import MetaStructuredData from 'components/Pages/Post/Meta/StructuredData'
import MetaTags from 'components/Pages/Post/Meta/Tags'
import { App } from 'app'
import Subheader from 'components/Subheader/WithComments'
import Edit from 'components/Pages/Post/Edit'
import LeftSidebar from 'components/Pages/Post/Sidebar/Left'
import RightSidebar from 'components/Pages/Post/Sidebar/Right'
import ShareBottom from 'components/Pages/Post/Share/Bottom'
import CommentsThread from 'components/Comments/Thread'
import CommentsInView from 'components/Comments/InView'
import AboutAuthorConcise from 'components/AboutAuthor/Concise'
// import { SubscriptionRegion } from 'components/Subscription/Region'
import useVerticalScroll, { RelativePosition } from 'hooks/useVerticalScroll'
import CommentsCount from 'components/Comments/Count'
import { CarbonAdsMetaTags, CarbonAdsSection } from 'features/carbonAds'
import { MdxPostProvider } from 'components/Pages/Post/MdxPostProvider'
import { BsaAdsMetaTags } from 'features/bsaAds'
import { BsaAdsStickyBanner } from 'entities/bsaAds'

const SHOW_SHARE_AFTER_Y = 500

interface PostTemplateProps {
  postRelativePath: string;
  post: PostDetailed;
  popularPostsByCategory: {
    plainPosts: PostPlain[],
    category: string
  }[];
}

export default function PostTemplate({
  postRelativePath,
  post,
  popularPostsByCategory,
}: PostTemplateProps) {
  const relativePosition = useVerticalScroll(SHOW_SHARE_AFTER_Y)
  const showShareButtons = relativePosition === RelativePosition.Below
  const leftSidebar = <LeftSidebar post={post} showShareButtons={showShareButtons} />
  const rightSidebar = <RightSidebar popularPostsByCategory={popularPostsByCategory} tags={post.tags} />
  return (
    <App leftSidebar={leftSidebar} rightSidebar={rightSidebar}>
      <MetaTags post={post} />
      <MetaStructuredData post={post} />
      <CarbonAdsMetaTags />
      <BsaAdsMetaTags />
      <article>
        <div className={styles.postCover}>
          <GatsbyImage image={post.thumbnail} alt="Post cover" />
        </div>
        <h1>{post.title}</h1>
        <Subheader post={post}>
          <CommentsCount post={post} />
        </Subheader>
        <div className={styles.carbonSection}>
          <Media query="(max-width: 1250px)" defaultMatches={false}>
            <CarbonAdsSection />
          </Media>
        </div>
        <MdxPostProvider tableOfContents={post.tableOfContents} tags={post.tags}>
          <div className={styles.postContent}>{post.children}</div>
        </MdxPostProvider>
        <div className={styles.shareGroup}>
          <div className={styles.shareBottom}>
            <ShareBottom post={post} />
          </div>
          <div className={styles.postEdit}>
            <Edit postRelativePath={postRelativePath} />
          </div>
        </div>
        {/* <div className={styles.bottomSubscriptionForm}>
          <SubscriptionRegion />
        </div> */}
        <div className={`${styles.delimiter} ${styles.authorInfoContainer}`}>
          <AboutAuthorConcise />
        </div>
        <div className={`${styles.delimiter} ${styles.comments}`} id="comments">
          <CommentsInView>
            <CommentsThread />
          </CommentsInView>
        </div>
      </article>
      <BsaAdsStickyBanner />
    </App>
  )
}
