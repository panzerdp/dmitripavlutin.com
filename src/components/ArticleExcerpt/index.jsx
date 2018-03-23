import React from 'react';
import PropTypes from 'prop-types';
import Link, { withPrefix } from 'gatsby-link';
import R from 'ramda';
import Img from 'gatsby-image';

import Subheader from 'components/Subheader';
import styles from './index.module.scss';

export default function ArticleExcerpt({ post }) {
  const slug = post.frontmatter.slug;
  const title = post.frontmatter.title;
  const sizes = post.frontmatter.thumbnail.childImageSharp.sizes;
  const to = `/${slug}/`;
  return (
    <article key={slug} className={styles.excerpt}>
      <Link exact to={to} className={styles.thumbnailAnchor}>
        <Img sizes={sizes} />
      </Link>
      <div className={styles.content} >
        <h4>
          <Link exact to={to}>
            {title}
          </Link>
        </h4>
        <Subheader post={post} />
        <div>
          <span dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          &nbsp; <Link exact to={to}>Continue reading</Link>
        </div>
      </div>
    </article>
  );
}

ArticleExcerpt.propTypes = {
  post: PropTypes.object
};