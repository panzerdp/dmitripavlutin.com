import styles from './index.module.scss';

import PopularPosts from 'components/Popular/Posts';
import SidebarItemsCommon from 'components/SidebarItems/Common';

interface PostRightSidebarProps {
  popularPosts: Post<FixedImage>[];
  siteUrl: string;
}

export default function PostRightSidebar({ popularPosts, siteUrl }: PostRightSidebarProps) {
  return (
    <div className={styles.rightSidebar}>
      <SidebarItemsCommon />
      <PopularPosts posts={popularPosts} siteUrl={siteUrl} />
    </div>
  );
}
