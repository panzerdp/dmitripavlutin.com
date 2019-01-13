import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import Subheader from '@common/Subheader';
import styles from './index.module.scss';
import { TO_POST } from 'routes/path';

export default function SimplePost({ title, slug, tags, publishedDate }) {
  const to = TO_POST({ slug });
  return (
    <div className={styles.simplePost}>
      <h4>
        <Link exact="true" to={to}>{title}</Link>
      </h4>
      <Subheader
        tags={tags}
        publishedDate={publishedDate}
      />
    </div>
  );
}

SimplePost.propTypes = {
  description: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.string,
  sizes: PropTypes.object,
  tags: PropTypes.array,
  publishedDate: PropTypes.string
};