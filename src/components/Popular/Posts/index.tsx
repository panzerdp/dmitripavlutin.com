import Link from 'gatsby-link';
import * as React from 'react';
import Img from 'gatsby-image';

import styles from './index.module.scss';
import { TO_POST } from 'routes/path';
import PostCommentsCount from 'components/Comments/Count';

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
              <Link to={toPost}>
                <Img fixed={post.thumbnail} className={styles.thumbnail} />
              </Link>
              <div>
                <div>
                  <Link to={toPost} className={styles.link}>
                    {post.title}
                  </Link>
                </div>
                <div className={styles.commentsCount}>
                  <img alt="Comments" src="/comments.svg" className={styles.icon} />
                  <Link to={`${toPost}#comments`}>
                    <PostCommentsCount
                      title={post.title}
                      url={siteUrl + toPost}
                      commentsTheadId={post.commentsThreadId}
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
