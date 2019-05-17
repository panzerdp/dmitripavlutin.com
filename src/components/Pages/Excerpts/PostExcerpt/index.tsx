import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import Subheader from 'components/Pages/Common/Subheader';
import styles from './index.module.scss';
import { TO_POST } from 'routes/path';

interface PostExcerptProps {
  post: PostExcerpt
}

export default function PostExcerptComponent({ post }: PostExcerptProps) {
  const to = TO_POST({ slug: post.slug });
  return (
    <article key={post.slug} className={styles.excerpt}>
      <Link to={to} className={styles.thumbnailAnchor}>
        <Img sizes={post.thumbnail} />
      </Link>
      <div className={styles.content}>
        <h4>
          <Link to={to}>
            {post.title}
          </Link>
        </h4>
        <Subheader tags={post.tags} publishedDate={post.published} />
        <div>{post.description} <Link className={styles.continueReading} to={to}>Continue reading &#x279e;</Link></div> 
      </div>
    </article>
  );
}

PostExcerptComponent.propTypes = {
  description: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.string,
  sizes: PropTypes.object,
  tags: PropTypes.array,
  publishedDate: PropTypes.string
};