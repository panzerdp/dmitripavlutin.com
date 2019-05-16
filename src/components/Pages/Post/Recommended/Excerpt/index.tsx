import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import styles from './index.module.scss';
import { TO_POST } from 'routes/path';

interface RecommendedExcerptProps {
  post: RecommendedPost
}

export default function RecommendedExcerpt({ post: { slug, title, thumbnail } }: RecommendedExcerptProps) {
  const to = TO_POST({ slug });
  return (
    <article key={slug} className={styles.excerpt}>
      <Link to={to} className={styles.thumbnailAnchor}>
        <Img sizes={thumbnail} />
      </Link>
      <div className={styles.content}>
        <h4>
          <Link to={to}>
            {title}
          </Link>
        </h4>
      </div>
    </article>
  );
}

RecommendedExcerpt.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  sizes: PropTypes.object
};