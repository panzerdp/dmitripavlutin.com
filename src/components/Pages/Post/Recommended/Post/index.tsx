import Img from 'gatsby-image';
import Link from 'gatsby-link';
import * as React from 'react';

import Tag from 'components/Tag';
import { TO_POST } from 'routes/path';
import styles from './index.module.scss';

interface RecommendedPostProps {
  post: Post<FixedImage>;
}

export default function RecommendedPost({ post: { slug, title, thumbnail, tags } }: RecommendedPostProps) {
  const to = TO_POST({ slug });
  return (
    <article key={slug} className={styles.excerpt}>
      <Link to={to} className={styles.thumbnailAnchor} title={title}>
        <Img fixed={thumbnail} />
      </Link>
      <div className={styles.content}>
        <h4>
          <Link to={to}>{title}</Link>
        </h4>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Tag tag={tag} key={tag} />
          ))}
        </div>
      </div>
    </article>
  );
}
