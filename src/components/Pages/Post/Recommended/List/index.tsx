import React from 'react';
import PropTypes from 'prop-types';

import RecommendedExcerpt from '../Excerpt';
import styles from './index.module.scss';

interface RecommendedListProps {
  posts: RecommendedPost[]
}

export default function RecommendedList({ posts }: RecommendedListProps) {
  const list = posts.map(function(post, index) {
    return (
      <RecommendedExcerpt
        post={post}
        key={index}
      />
    );
  });
  return (
    <div className={styles.recommended}>
      <h3>
        Recommended reading:
      </h3>
      <div className={styles.list}>
        {list}
      </div>
    </div>
  );
}

RecommendedList.propTypes = {
  posts: PropTypes.array
};