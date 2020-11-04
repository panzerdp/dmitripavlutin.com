import Link from 'gatsby-link';

import styles from './index.module.scss';
import { TO_POST } from 'routes/path';

interface PopularPostsListProps {
  posts: Post<FixedImage>[];
  siteUrl: string;
}

export default function PopularPostsList({ posts, siteUrl }: PopularPostsListProps) {
  return (
    <div className={styles.popularPosts}>
      <h3>Read popular posts</h3>
      <div className={styles.list}>
        {posts.map((post) => {
          const toPost = TO_POST({ slug: post.slug });
          return (
            <div key={post.slug} className={styles.item}>
              <span className={styles.square}>&#x25A0;</span>
              <Link to={toPost} className={styles.link}>{post.title}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
