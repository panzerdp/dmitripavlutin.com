import { useState } from 'react';
import Link from 'gatsby-link';

import styles from './index.module.scss';
import { TO_POST } from 'routes/path';

interface PopularPostsProps {
  popularPostsByCategory: {
    plainPosts: PostPlain[],
    category: string
  }[];
}

export default function PopularPosts({ popularPostsByCategory }: PopularPostsProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0); 
  return (
    <div className={styles.popularPosts}>
      <h3>Popular posts</h3>
      <div className={styles.tabs}>
        <div className={styles.titles}>
          {popularPostsByCategory.map(({ category }, index) => {
            const tabClassName = `${styles.title} ${activeTabIndex === index ? styles.activeTitle : ''}`;
            return (
              <div 
                key={category} 
                className={tabClassName}
                onClick={() => setActiveTabIndex(index)}
              >{category}</div>
            );
          })}
        </div>
        {popularPostsByCategory.map(({ category, plainPosts }, index) => {
          const tabClassName = `${styles.listTab} ${activeTabIndex === index ? styles.active : ''}`;
          return (
            <div className={tabClassName} key={category}>
              {plainPosts.map(mapPost)}
            </div>
          );
        })}
      </div>
    </div>
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