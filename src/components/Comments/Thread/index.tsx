import * as React from 'react';
import { Disqus } from 'gatsby-plugin-disqus';

import styles from './index.module.scss';

interface CommentsThreadProps {
  url: string;
  title: string;
  commentsTheadId: string | undefined;
}

export function CommentsThread({ url, title, commentsTheadId }: CommentsThreadProps) {
  const disqusConfig = {
    url: url,
    title: title,
    identifier: commentsTheadId,
  };
  return (
    <div className={styles.commentsThread}>
      <Disqus config={disqusConfig} />
    </div>
  );
}

export default React.memo(CommentsThread);
