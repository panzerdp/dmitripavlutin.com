import ShareGroupHorizontal from '../Group/Horizontal';
import styles from './index.module.scss';

interface PostShareButtomProps {
  url: string;
  text: string;
  tags: Tags;
  twitterName: string;
}

export default function PostShareBottom(props: PostShareButtomProps) {
  return (
    <div className={styles.postShareBottom}>
      <h4>Like the post? Please share!</h4>
      <div className={styles.shareGroup}>
        <ShareGroupHorizontal {...props} />
      </div>
    </div>
  );
}
