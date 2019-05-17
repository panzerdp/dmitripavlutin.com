import React from 'react';

import styles from './index.module.scss';
import SimplePost from '../Post';

interface SimpleListProps {
  posts: PostExcerpt[]
}

export default function SimpleList({ posts }: SimpleListProps) {
  return (
    <div className={styles.simpleList}>
      {posts.map((post, index) => <SimplePost post={post} key={index} />)}
    </div>
  );
}