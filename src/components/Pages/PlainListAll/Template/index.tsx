import Layout from 'components/Layout/Fetch'
import SimpleList from 'components/Simple/List'
import MetaTags from '../Meta/Tags'
import PlainListAllRightSidebar from 'components/Pages/PlainListAll/Sidebar/Right'
import { formatDateToMonth } from 'utils/date'
import { Post, PostPlain } from 'typings/post'

import * as styles from './index.module.scss'


interface PlainListAllTemplateProps {
  posts: PostPlain[];
}

export default function PlainListAllTemplate({ posts }: PlainListAllTemplateProps) {
  return (
    <Layout rightSidebar={<PlainListAllRightSidebar />}>
      <MetaTags />
      <div className={styles.plainList}>
        <h1>All posts</h1>
        <SimpleList posts={posts} beforeEachPost={beforeEachPost.bind(undefined, [])} />
      </div>
    </Layout>
  )
}

export function beforeEachPost(displayedMonths: string[], post: Post) {
  const month = formatDateToMonth(post.published)
  const alreadyDisplayed = displayedMonths.includes(month)
  if (alreadyDisplayed) {
    return null
  }
  displayedMonths.push(month)
  return <h2>{month}</h2>
}
