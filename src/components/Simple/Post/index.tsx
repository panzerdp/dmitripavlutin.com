import { Link } from 'gatsby-link';

import SubheaderSimple from 'components/Subheader/Simple';
import { TO_POST } from 'routes/path';
import * as styles from './index.module.scss';

interface SimplePostProps {
  post: PostPlain;
}

export default function SimplePost({ post }: SimplePostProps) {
  const to = TO_POST({ slug: post.slug });
  return (
    <div className={styles.simplePost}>
      <h3>
        <Link to={to}>{post.title}</Link>
      </h3>
      <SubheaderSimple post={post} />
    </div>
  );
}
