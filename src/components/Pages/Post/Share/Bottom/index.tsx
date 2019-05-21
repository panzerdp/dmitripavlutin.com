import * as React from 'react';

import ShareGroupHorizontal from '../Group/Horizontal';
import styles from './index.module.scss';

interface PostShareButtomProps {
  url: string;
  text: string;
  tags: Tags;
}

export default function PostShareBottom({ url, text, tags }: PostShareButtomProps) {
  return (
    <div className={styles.postShareBottom}>
      <h3>Like the post? Share it!</h3>
      <ShareGroupHorizontal url={url} text={text} tags={tags} />
    </div>
  );
}
