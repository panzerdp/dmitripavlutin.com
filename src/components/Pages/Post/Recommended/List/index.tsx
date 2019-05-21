import * as React from 'react';

import RecommendedExcerpt from '../Excerpt';
import styles from './index.module.scss';

interface RecommendedListProps {
  posts: PostExcerpt[];
}

export default function RecommendedList({ posts }: RecommendedListProps) {
  const list = posts.map(function(post: PostExcerpt, index: number) {
    return <RecommendedExcerpt post={post} key={index} />;
  });
  return (
    <div className={styles.recommended}>
      <h3>Recommended reading:</h3>
      <div className={styles.list}>{list}</div>
    </div>
  );
}
