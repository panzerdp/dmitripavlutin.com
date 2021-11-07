import { GatsbyImage } from 'gatsby-plugin-image';
import Link from 'gatsby-link';

import SubheaderWithComments from 'components/Subheader/WithComments';
import { TO_POST } from 'routes/path';
import { Post } from 'typings/post';

import * as styles from './index.module.scss';

interface ExcerptProps {
  post: Post;
}

export default function Excerpt({ post }: ExcerptProps) {
  const to = TO_POST({ slug: post.slug });
  return (
    <article key={post.slug} className={styles.excerpt}>
      <Link to={to} className={styles.thumbnailAnchor}>
        <GatsbyImage image={post.thumbnail} alt="Post image" />
      </Link>
      <div className={styles.content}>
        <h4>
          <Link to={to}>{post.title}</Link>
        </h4>
        <SubheaderWithComments post={post} />
        <div className={styles.description}>{post.description} </div>
        <Link to={to} className={styles.continueReading}>
          Continue reading &#x279e;
        </Link>
      </div>
    </article>
  );
}
