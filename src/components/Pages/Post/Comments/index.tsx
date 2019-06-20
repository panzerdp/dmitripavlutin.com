import * as React from 'react';
import Disqus from 'gatsby-plugin-disqus';

import styles from './index.module.scss';

interface PostCommentsProps {
  url: string;
  title: string;
}

export default function PostComments({ url, title }: PostCommentsProps) {
  return (
    <div className={styles.postComments}>
      <Disqus url={url} title={title} />
    </div>
  );
}
