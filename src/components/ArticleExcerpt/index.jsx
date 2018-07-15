import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import Subheader from 'components/Subheader';
import styles from './index.module.scss';
import { TO_POST } from 'routes/path';

export default function ArticleExcerpt({ excerpt, slug, title, sizes, tags, publishedDate }) {
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
        <Subheader tags={tags} publishedDate={publishedDate} />
        <div>
          <span dangerouslySetInnerHTML={{ __html: excerpt }} /> <Link className={styles.continueReading} exact to={to}>Continue reading &#x279e;</Link>
        </div>
      </div>
    </article>
  );
}

ArticleExcerpt.propTypes = {
  excerpt: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.string,
  sizes: PropTypes.object,
  tags: PropTypes.array,
  publishedDate: PropTypes.string
};