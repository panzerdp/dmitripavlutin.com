import * as React from 'react';

import Tag from 'components/Tag';
import PostCommentsCount from 'components/Pages/Post/Comments/Count';
import { formatDate } from 'utils/date';
import styles from './index.module.scss';

interface SubheaderWithCommentsProps {
  post: PostPlain;
  url: string;
  threadAnchor: string;
}

export default function SubheaderWithComments({ post, url, threadAnchor }: SubheaderWithCommentsProps) {
  return (
    <div className={styles.subheader}>
      <div className={styles.published}>{formatDate(post.published)}</div>
      <div className={styles.line}>
        <div className={styles.tags}>{post.tags.map(mapTag)}</div>
        <div className={styles.commentsCount}>
          <span className={styles.icon}>&#x1f4ac;</span>
          <a href={threadAnchor} title="Jump to comments section">
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
