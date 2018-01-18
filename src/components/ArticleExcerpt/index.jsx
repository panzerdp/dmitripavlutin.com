import React from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';

import styles from './index.module.scss';

export default function ArticleExcerpt({ node }) {
  const title = get(node, 'frontmatter.title') || node.fields.slug;
  return (
    <article key={node.fields.slug} className={styles.articleExcerpt}>
      <h4>
        <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
          {title}
        </Link>
      </h4>
      <small>{node.frontmatter.date}</small>
      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
    </article>
  );
}