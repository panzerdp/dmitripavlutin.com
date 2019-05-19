import React from 'react';

import styles from './index.module.scss';
import Tag from 'components/Pages/Common/Tag';

interface SubheaderProps {
  tags: Tags;
  published: string;
}

export default function Subheader({ tags, published }: SubheaderProps) {
  console.log(published);
  return (
    <div className={styles.subheader}>
      <div className={styles.tags}>{tags.map(mapTag)}</div>
      <small>{published}</small>
    </div>
  );
}

function mapTag(tagName: string) {
  return <Tag name={tagName} key={tagName} />;
}