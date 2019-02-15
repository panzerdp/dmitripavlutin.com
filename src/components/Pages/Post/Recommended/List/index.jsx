import React from 'react';
import PropTypes from 'prop-types';

import RecommendedExcerpt from '../Excerpt';
import styles from './index.module.scss';

export default function RecommendedList({ posts }) {
  const list = posts.map(function({
    node: {
      frontmatter: { title, slug, thumbnail }
    }
  }, index) {
    return (
      <RecommendedExcerpt
        title={title}
        slug={slug}
        sizes={thumbnail.childImageSharp.sizes}
        key={index}
      />
    );
  });
  return (
    <div className={styles.recommendedList}>
      {list}
    </div>
  );
}

RecommendedList.propTypes = {
  posts: PropTypes.array
};