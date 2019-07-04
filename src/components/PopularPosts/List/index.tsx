import * as React from 'react';

import styles from './index.module.scss';

import Item from 'components/PopularPosts/Item';

interface PopularPostsListProps {
  posts: PostPlain[];
}

export default function PopularPostsList({ posts }: PopularPostsListProps) {
  return (
    <div className={styles.popuplarPostsList}>
      {posts.map((post) => (
        <Item post={post} key={post.slug} />
      ))}
    </div>
  );
}
