import styles from './index.module.scss';

import PopularPosts from 'components/Popular/Posts';
import PopularTagsFetch from 'components/Popular/Tags/Fetch';
import PopularTagsList from 'components/Popular/Tags/List';
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
      <PopularTagsFetch render={renderPosts} />
    </div>
  );
}

function renderPosts(posts: PostPlain[]) {
  return <PopularTagsList posts={posts} title="Explore popular tags" limit={20} />;
}
