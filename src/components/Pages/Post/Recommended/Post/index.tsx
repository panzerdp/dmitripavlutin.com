import { Link } from 'gatsby-link';

import Tag from 'components/Tag';
import { TO_POST } from 'routes/path';
import * as styles from './index.module.scss';

interface RecommendedPostProps {
  post: PostPlain;
}

export default function RecommendedPost({ post: { slug, title, tags } }: RecommendedPostProps) {
  const to = TO_POST({ slug });
  return (
    <article key={slug} className={styles.excerpt}>
      <div className={styles.content}>
        <h4>
          <Link to={to}>{title}</Link>
        </h4>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Tag tag={tag} key={tag} />
          ))}
        </div>
      </div>
    </article>
  );
}
