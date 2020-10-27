import * as React from 'react';

import Tag from 'components/Tag';
import PostCommentsCount from 'components/Comments/Count';
import { formatDate } from 'utils/date';
import styles from './index.module.scss';
import { TO_POST } from 'routes/path';

interface SubheaderWithCommentsProps {
  post: PostPlain;
  siteUrl: string;
  loadCommentsCount?: boolean;
}

const MONTH = 31 * 24 * 60 * 60 * 1000;

export default function SubheaderWithComments({ post, siteUrl, loadCommentsCount = false }: SubheaderWithCommentsProps) {
  const postUrl = TO_POST({ slug: post.slug });
  const publishedDate = new Date(post.published);
  const modifiedDate = new Date(post.modified);
  let postDateType = 'Posted';
  let postDateFormatted = formatDate(post.published);
  if (modifiedDate.getTime() - publishedDate.getTime() >= MONTH) {
    postDateType = 'Updated';
    postDateFormatted = formatDate(post.modified);
  }
  return (
    <div className={styles.subheader}>
      <div className={styles.published}>{postDateType} {postDateFormatted}</div>
      <div className={styles.line}>
        <div className={styles.tags}>{post.tags.map(mapTag)}</div>
        <div className={styles.commentsCount}>
          <img alt="Comments" src="/icons/comments.svg" className={styles.icon} />
          <a href={`${postUrl}#comments`} title="Jump to comments section" className={styles.anchor}>
            {loadCommentsCount ? <PostCommentsCount postUrl={postUrl} /> : 'Start discussion'}
          </a>
        </div>
      </div>
    </div>
  );
}

function mapTag(tagName: string) {
  return <Tag tag={tagName} key={tagName} />;
}
