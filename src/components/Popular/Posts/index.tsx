import Link from 'gatsby-link';
import * as React from 'react';

import styles from './index.module.scss';
import { TO_POST } from 'routes/path';
import PostCommentsCount from 'components/Comments/Count';
import Tag from 'components/Tag';

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
          const tags = post.tags.slice(1, 2).map(tag => <Tag tag={tag} key={tag} />);
          return (
            <div key={post.slug} className={styles.item}>
              <Link to={toPost} className={styles.link}>{post.title}</Link>
              <div className={styles.tagsAndComments}>
                <div className={styles.tags}>{tags}</div>
                <div className={styles.commentsCount}>
                  <img alt="Comments" src="/icons/comments.svg" className={styles.icon} />
                  <Link to={`${toPost}#comments`}>
                    <PostCommentsCount
                      title={post.title}
                      url={siteUrl + toPost}
                      commentsTheadId={post.commentsThreadId ?? ''}
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
