import Link from 'gatsby-link';

import styles from './index.module.scss';
import { TO_POST } from 'routes/path';

interface PopularPostsListTabsProps {
  activeTabIndex: number;
  popularPostsByCategory: {
    plainPosts: PostPlain[],
    category: string
  }[];
}

export default function PopularPostsListTabs({ popularPostsByCategory, activeTabIndex }: PopularPostsListTabsProps) {
  return (
    <>
      {popularPostsByCategory.map(({ category, plainPosts }, index) => {
        const tabClassName = `${styles.listTab} ${activeTabIndex === index ? styles.active : ''}`;
        return (
          <div className={tabClassName} key={category}>
            {plainPosts.map(mapPost)}
          </div>
        );
      })}
    </>
  );
}

function mapPost(post: PostPlain) {
  const toPost = TO_POST({ slug: post.slug });
  return (
    <div key={post.slug} className={styles.item}>
      <span className={styles.square}>&#x25A0;</span>
      <Link to={toPost} className={styles.link}>{post.title}</Link>
    </div>
  );  
}