import * as React from 'react';
import Media from 'react-media';

import styles from './index.module.scss';

import SubscriptionRegion from 'components/Subscription/Region';
import CarbonAdsFetch from 'components/CarbonAds/Fetch';
import CarbonAdsBanner from 'components/CarbonAds/Banner';
import PopularPostsList from 'components/PopularPosts/List';

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
      <PopularPostsList posts={popularPosts} />
    </div>
  );
}
