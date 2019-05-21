import Link from 'gatsby-link';
import * as React from 'react';

import Subheader from 'components/Pages/Common/Subheader';
import { TO_POST } from 'routes/path';
import styles from './index.module.scss';

interface SimplePostProps {
  post: PostExcerpt;
}

export default function SimplePost({ post }: SimplePostProps) {
  const to = TO_POST({ slug: post.slug });
  return (
    <div className={styles.simplePost}>
      <h4>
        <Link to={to}>{post.title}</Link>
      </h4>
      <Subheader tags={post.tags} published={post.published} />
    </div>
  );
}
