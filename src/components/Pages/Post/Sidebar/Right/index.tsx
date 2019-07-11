import * as React from 'react';

import styles from './index.module.scss';

import SubscriptionRegion from 'components/Subscription/Region';
import PopularPosts from 'components/Popular/Posts';
import PopularTagsFetch from 'components/Popular/Tags/Fetch';
import PopularTagsList from 'components/Popular/Tags/List';

interface PostRightSidebarProps {
  popularPosts: PostPlain[];
}

export default function PostRightSidebar({ popularPosts }: PostRightSidebarProps) {
  return (
    <div className={styles.rightSidebar}>
      <SubscriptionRegion />
      <PopularPosts posts={popularPosts} />
      <PopularTagsFetch render={(posts) => <PopularTagsList posts={posts} title="Explore popular tags" limit={20} />} />
    </div>
  );
}
