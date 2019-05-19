import React from 'react';

import styles from './index.module.scss';
import Tag from 'components/Pages/Common/Tag';
import { formatDate } from 'utils/date';

interface SubheaderProps {
  tags: Tags;
  published: string;
}

export default function Subheader({ tags, published }: SubheaderProps) {
  return (
    <div className={styles.subheader}>
      <div className={styles.tags}>{tags.map(mapTag)}</div>
      <small>{formatDate(published)}</small>
    </div>
  );
}

function mapTag(tagName: string) {
  return <Tag name={tagName} key={tagName} />;
}