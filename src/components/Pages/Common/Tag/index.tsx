import React from 'react';
import Link from 'gatsby-link';

import styles from './index.module.scss';
import { TO_TAG } from 'routes/path';
import { slugify } from 'utils/string';

interface TagProps {
  name: string;
}

export default function Tag({ name }: TagProps) {
  return (
    <Link
      to={TO_TAG({ slug: slugify(name) })} 
      className={styles.tag}
    >
      <span>{name}</span>
    </Link>
  );
}