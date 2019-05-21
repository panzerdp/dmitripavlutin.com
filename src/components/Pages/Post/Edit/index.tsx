import * as React from 'react';

import styles from './index.module.scss';

interface PostEditProps {
  url: string;
}

export default function PostEdit({ url }: PostEditProps) {
  return (
    <div className={styles.postEdit}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img alt="GitHub Logo" src="/github.svg" />
        <span>Edit on GitHub</span>
      </a>
    </div>
  );
}
