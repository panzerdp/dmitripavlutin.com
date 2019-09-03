import * as React from 'react';

import Tag from 'components/Tag';
import PostCommentsCount from 'components/Pages/Post/Comments/Count';
import { formatDate } from 'utils/date';
import styles from './index.module.scss';

interface PostSubheaderProps {
  post: PostPlain;
  url: string;
  commentsTheadId: string | undefined;
}

export default function PostSubheader({ post, url, commentsTheadId }: PostSubheaderProps) {
  return (
    <div className={styles.subheader}>
      <div className={styles.tags}>{post.tags.map(mapTag)}</div>
      <div className={styles.right}>
        <a href="#disqus_thread" className={styles.commentsCount}>
          <PostCommentsCount title={post.title} url={url} commentsTheadId={commentsTheadId} />
        </a>
        <span className={styles.published}>{formatDate(post.published)}</span>
      </div>
    </div>
  );
}

function mapTag(tagName: string) {
  return <Tag tag={tagName} key={tagName} />;
}
