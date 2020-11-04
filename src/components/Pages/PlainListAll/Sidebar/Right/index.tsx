import styles from './index.module.scss';

import PopularTagsFetch from 'components/Popular/Tags/Fetch';
import PopularTagsList from 'components/Popular/Tags/List';

export default function PostRightSidebar() {
  return (
    <div className={styles.rightSidebar}>
      <PopularTagsFetch render={(posts) => <PopularTagsList posts={posts} title="Tags" />} />
    </div>
  );
}
