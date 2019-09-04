import Img from 'gatsby-image';
import Link from 'gatsby-link';
import * as React from 'react';

import Subheader from 'components/Subheader/WithComments';
import { TO_POST } from 'routes/path';
import styles from './index.module.scss';

interface ExcerptProps {
  post: PostExcerpt;
  siteUrl: string;
}

export default function Excerpt({ post, siteUrl }: ExcerptProps) {
  const to = TO_POST({ slug: post.slug });
  const postUrl = siteUrl + to;
  return (
    <article key={post.slug} className={styles.excerpt}>
      <Link to={to} className={styles.thumbnailAnchor}>
        <Img sizes={post.thumbnail} />
      </Link>
      <div className={styles.content}>
        <h4>
          <Link to={to}>{post.title}</Link>
        </h4>
        <Subheader post={post} url={postUrl} threadAnchor={`${postUrl}#disqus_thread`} />
        <div className={styles.description}>{post.description} </div>
        <Link to={to} className={styles.continueReading}>
          Continue reading &#x279e;
        </Link>
      </div>
    </article>
  );
}
