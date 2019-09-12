import * as React from 'react';

import RecommendedPost from '../Post';
import styles from './index.module.scss';

interface RecommendedListProps {
  posts: Post<FixedImage>[];
}

export default function RecommendedList({ posts }: RecommendedListProps) {
  const list = posts.map(function(post: Post<FixedImage>, index: number) {
    return <RecommendedPost post={post} key={index} />;
  });
  return (
    <div className={styles.recommended}>
      <h3>Recommended reading:</h3>
      <div className={styles.list}>{list}</div>
    </div>
  );
}
