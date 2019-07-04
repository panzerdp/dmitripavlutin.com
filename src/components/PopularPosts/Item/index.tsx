import * as React from 'react';

import styles from './index.module.scss';

interface PopularPostsItemProps {
  post: PostPlain;
}

export default function PopularPostsItem({ post }: PopularPostsItemProps) {
  return <div className={styles.popuplarPostsItem}>{post.title}</div>;
}
