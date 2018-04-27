import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import Subheader from 'components/Subheader';
import styles from './index.module.scss';
import { TO_POST } from 'routes/path';

export default function ArticleExcerpt({ post }) {
  const slug = post.frontmatter.slug;
  const title = post.frontmatter.title;
  const sizes = post.frontmatter.thumbnail.childImageSharp.sizes;
  const to = TO_POST({ slug });
  return (
    <article key={slug} className={styles.excerpt}>
      <Link exact to={to} className={styles.thumbnailAnchor}>
        <Img sizes={sizes} />
      </Link>
      <div className={styles.content}>
        <h4>
          <Link exact to={to}>
            {title}
          </Link>
        </h4>
        <Subheader post={post} />
        <div>
          <span dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          <Link className={styles.continueReading} exact to={to}>
            Continue reading &#x279e;
          </Link>
        </div>
      </div>
    </article>
  );
}

ArticleExcerpt.propTypes = {
  post: PropTypes.object
};