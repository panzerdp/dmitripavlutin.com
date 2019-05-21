import * as React from 'react';

import SimplePost from '../Post';
import styles from './index.module.scss';

interface SimpleListProps {
  posts: PostExcerpt[];
}

export default function SimpleList({ posts }: SimpleListProps) {
  return (
    <div className={styles.simpleList}>
      {posts.map((post, index) => (
        <SimplePost post={post} key={index} />
      ))}
    </div>
  );
}
