import Link from 'gatsby-link';
import * as React from 'react';

import styles from './index.module.scss';

import { TO_POST } from 'routes/path';

interface PopularPostsListProps {
  posts: PostPlain[];
}

export default function PopularPostsList({ posts }: PopularPostsListProps) {
  return (
    <div className={styles.popularPosts}>
      <h2>Read popular posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={TO_POST({ slug: post.slug })}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
