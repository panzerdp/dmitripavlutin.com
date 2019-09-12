import * as React from 'react';

import Tag from 'components/Tag';
import PostCommentsCount from 'components/Comments/Count';
import { formatDate } from 'utils/date';
import styles from './index.module.scss';
import { TO_POST } from 'routes/path';

interface SubheaderWithCommentsProps {
  post: PostPlain;
  siteUrl: string;
}

export default function SubheaderWithComments({ post, siteUrl }: SubheaderWithCommentsProps) {
  const postUrl = TO_POST({ slug: post.slug });
  const url = siteUrl + postUrl;
  return (
    <div className={styles.subheader}>
      <div className={styles.published}>{formatDate(post.published)}</div>
      <div className={styles.line}>
        <div className={styles.tags}>{post.tags.map(mapTag)}</div>
        <div className={styles.commentsCount}>
          <img alt="Comments" src="/comments.svg" className={styles.icon} />
          <a href={`${postUrl}#disqus_thread`} title="Jump to comments section" className={styles.anchor}>
            <PostCommentsCount title={post.title} url={url} commentsTheadId={post.commentsThreadId} />
          </a>
        </div>
      </div>
    </div>
  );
}

function mapTag(tagName: string) {
  return <Tag tag={tagName} key={tagName} />;
}
