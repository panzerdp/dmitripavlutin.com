import Img from 'gatsby-image';
import Link from 'gatsby-link';
import * as React from 'react';

import Subheader from 'components/Pages/Common/Subheader';
import { TO_POST } from 'routes/path';
import styles from './index.module.scss';

interface ExcerptProps {
  post: PostExcerpt;
}

export default function Excerpt({ post }: ExcerptProps) {
  const to = TO_POST({ slug: post.slug });
  return (
    <article key={post.slug} className={styles.excerpt}>
      <Link to={to} className={styles.thumbnailAnchor}>
        <Img sizes={post.thumbnail} />
      </Link>
      <div className={styles.content}>
        <h4>
          <Link to={to}>{post.title}</Link>
        </h4>
        <Subheader tags={post.tags} published={post.published} />
        <div>
          {post.description}{' '}
        </div>
        <Link to={to} className={styles.continueReading}>
          Continue reading &#x279e;
        </Link>
      </div>
    </article>
  );
}
