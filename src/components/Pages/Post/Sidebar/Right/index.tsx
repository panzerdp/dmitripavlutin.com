import * as styles from './index.module.scss';

import PopularPosts from 'components/Popular/Posts';
import SidebarItemsCommon from 'components/SidebarItems/Common';
import { PostPlain } from 'typings/post';

interface PostRightSidebarProps {
  popularPostsByCategory: {
    plainPosts: PostPlain[],
    category: string
  }[];
}

export default function PostRightSidebar({ popularPostsByCategory }: PostRightSidebarProps) {
  return (
    <div className={styles.rightSidebar}>
      <SidebarItemsCommon />
      <PopularPosts popularPostsByCategory={popularPostsByCategory} />
    </div>
  );
}
