import * as styles from './index.module.scss';

import PopularPosts from 'components/Popular/Posts';
import SidebarItemsCommon from 'components/SidebarItems/Common';

interface PostRightSidebarProps {
  popularPostsByCategory: {
    plainPosts: PostPlain[],
    category: string
  }[];
  siteUrl: string;
}

export default function PostRightSidebar({ popularPostsByCategory, siteUrl }: PostRightSidebarProps) {
  return (
    <div className={styles.rightSidebar}>
      <SidebarItemsCommon />
      <PopularPosts popularPostsByCategory={popularPostsByCategory} siteUrl={siteUrl} />
    </div>
  );
}
