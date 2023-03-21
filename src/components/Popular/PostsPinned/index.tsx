import { useState } from 'react'
import { Link } from 'gatsby-link'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Post } from 'typings/post'

import * as styles from './index.module.scss'
import { TO_POST } from 'routes/path'
import Tag from 'components/Tag'

interface PopularPostsPinnedProps {
  popularPostsByCategory: {
    plainPosts: Post[],
    category: string
  }[];
}

export default function PopularPostsPinned({ popularPostsByCategory }: PopularPostsPinnedProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  return (
    <div className={styles.popularPostsPinned}>
      <h3>Popular posts</h3>
      <div className={styles.tabs}>
        <div className={styles.titles}>
          {popularPostsByCategory.map(({ category }, index) => {
            const tabClassName = `${styles.title} ${activeTabIndex === index ? styles.activeTitle : ''}`
            return (
              <div
                key={category}
                className={tabClassName}
                onClick={() => setActiveTabIndex(index)}
              >{category}</div>
            )
          })}
        </div>
        {popularPostsByCategory.map(({ category, plainPosts }, index) => {
          const tabClassName = `${styles.listTab} ${activeTabIndex === index ? styles.active : ''}`
          return (
            <div className={tabClassName} key={category}>
              {plainPosts.map(mapPost)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function mapPost(post: Post) {
  const toPost = TO_POST({ slug: post.slug })
  return (
    <div key={post.slug} className={styles.item}>
      <Link to={toPost} className={styles.thumbnailAnchor} title={post.title}>
        <GatsbyImage image={post.thumbnail} alt="Post image" />
      </Link>
      <div>
        <span className={styles.square}>&#x25A0;</span>
        <Link to={toPost} className={styles.link}>{post.title}</Link>
        <div className={styles.tags}>
          {post.tags.slice(0, 2).map(tag => <Tag tag={tag} key={tag} />)}
        </div>
      </div>
    </div>
  )
}