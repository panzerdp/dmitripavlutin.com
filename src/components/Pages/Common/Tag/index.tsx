import Link from 'gatsby-link';
import React from 'react';

import { TO_TAG } from 'routes/path';
import { slugify } from 'utils/string';
import styles from './index.module.scss';

interface TagProps {
  name: string;
}

export default function Tag({ name }: TagProps) {
  return (
    <Link to={TO_TAG({ slug: slugify(name) })} className={styles.tag}>
      <span>{name}</span>
    </Link>
  );
}
