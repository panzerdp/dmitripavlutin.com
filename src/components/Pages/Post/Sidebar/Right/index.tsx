import * as React from 'react';
import Media from 'react-media';

import styles from './index.module.scss';

import SubscriptionRegion from 'components/Subscription/Region';
import CarbonAdsFetch from 'components/CarbonAds/Fetch';
import CarbonAdsBanner from 'components/CarbonAds/Banner';
import PopularPosts from 'components/Popular/Posts';
import PopularTagsFetch from 'components/Popular/Tags/Fetch';
import PopularTagsList from 'components/Popular/Tags/List';

interface PostRightSidebarProps {
  popularPosts: PostPlain[];
}

export default function PostRightSidebar({ popularPosts }: PostRightSidebarProps) {
  return (
    <div className={styles.rightSidebar}>
      <div className={styles.carbonAdsContainer}>
        <Media query="(min-width: 1201px)" defaultMatches={false}>
          <CarbonAdsFetch render={(service) => <CarbonAdsBanner carbonAdsService={service} />} />
        </Media>
      </div>
      <SubscriptionRegion />
      <PopularPosts posts={popularPosts} />
      <PopularTagsFetch render={(posts) => <PopularTagsList posts={posts} title="Explore popular tags" limit={20} />} />
    </div>
  );
}
