import Link from 'gatsby-link';

import { TO_TAG } from 'routes/path';
import { slugify } from 'utils/string';
import * as styles from './index.module.scss';

interface TagProps {
  tag: string;
  label?: string;
}

export default function Tag({ tag, label }: TagProps) {
  if (!label) {
    label = tag;
  }
  return (
    <Link to={TO_TAG({ slug: slugify(tag) })} className={styles.tag}>
      <span>{label}</span>
    </Link>
  );
}
