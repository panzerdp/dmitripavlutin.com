import * as React from 'react';

import styles from './index.module.scss';

import SubscriptionRegion from 'components/Subscription/Region';
import PopularPosts from 'components/Popular/Posts';
import PopularTagsFetch from 'components/Popular/Tags/Fetch';
import PopularTagsList from 'components/Popular/Tags/List';
import AboutAuthorDetailed from 'components/AboutAuthor/Detailed';
import AboutAuthorContact from 'components/AboutAuthor/Contact';
import AboutAuthorFetch from 'components/AboutAuthor/Fetch';

interface PostRightSidebarProps {
  popularPosts: PostPlain[];
}

export default function PostRightSidebar({ popularPosts }: PostRightSidebarProps) {
  return (
    <div className={styles.rightSidebar}>
      <SubscriptionRegion />
      <AboutAuthorFetch
        render={({ authorInfo, authorProfilePictureBig, authorStats }) => {
          return (
            <>
              <AboutAuthorDetailed
                authorInfo={authorInfo}
                authorProfilePicture={authorProfilePictureBig}
                authorStats={authorStats}
              />
              <AboutAuthorContact authorInfo={authorInfo} />
            </>
          );
        }}
      />
      <PopularPosts posts={popularPosts} />
      <PopularTagsFetch render={(posts) => <PopularTagsList posts={posts} title="Explore popular tags" limit={20} />} />
    </div>
  );
}
