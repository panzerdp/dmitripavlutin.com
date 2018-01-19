import React from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';
import Img from 'gatsby-image';

import styles from './index.module.scss';

export default function ArticleExcerpt({ node }) {
  const title = get(node, 'frontmatter.title') || node.fields.slug;
  return (
    <article key={node.fields.slug} className={styles.excerpt}>
      <img src={node.frontmatter.thumbnail.childImageSharp.resize.src} className={styles.thumbnail} />
      <div className={styles.content} >
        <h4>
          <Link to={node.fields.slug}>
            {title}
          </Link>
        </h4>
        <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        <div className={styles.date}>
          <small>{node.frontmatter.date}</small>
        </div>
      </div>
    </article>
  );
}