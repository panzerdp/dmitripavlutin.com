import RecommendedPost from '../Post';
import * as styles from './index.module.scss';

interface RecommendedListProps {
  posts: PostPlain[];
}

export default function RecommendedList({ posts }: RecommendedListProps) {
  const list = posts.map((post, index) => <RecommendedPost post={post} key={index} />);
  return (
    <div className={styles.recommended}>
      <h3>Recommended reading:</h3>
      <div className={styles.list}>{list}</div>
    </div>
  );
}
