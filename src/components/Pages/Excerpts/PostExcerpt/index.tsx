import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import Subheader from 'components/Pages/Common/Subheader';
import styles from './index.module.scss';
import { TO_POST } from 'routes/path';

export default function PostExcerpt({ slug, title, description, sizes, tags, publishedDate }) {
  const to = TO_POST({ slug });
  return (
    <article key={slug} className={styles.excerpt}>
      <Link to={to} className={styles.thumbnailAnchor}>
        <Img sizes={sizes} />
      </Link>
      <div className={styles.content}>
        <h4>
          <Link to={to}>
            {title}
          </Link>
        </h4>
        <Subheader tags={tags} publishedDate={publishedDate} />
        <div>{description} <Link className={styles.continueReading} to={to}>Continue reading &#x279e;</Link></div> 
      </div>
    </article>
  );
}

ArticleExcerpt.propTypes = {
  description: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.string,
  sizes: PropTypes.object,
  tags: PropTypes.array,
  publishedDate: PropTypes.string
};