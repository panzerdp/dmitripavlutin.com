import * as React from 'react';

import styles from './index.module.scss';

import SubscriptionRegion from 'components/Subscription/Region';
import AboutAuthorDetailed from 'components/AboutAuthor/Detailed';
import AboutAuthorFetch from 'components/AboutAuthor/Fetch';

export default function ExcerptsListRightSidebar() {
  return (
    <div className={styles.rightSidebar}>
      <SubscriptionRegion />
      <AboutAuthorFetch
        render={({ authorInfo, authorProfilePictureBig, authorStats }) => {
          return (
            <AboutAuthorDetailed
              authorInfo={authorInfo}
              authorProfilePicture={authorProfilePictureBig}
              authorStats={authorStats}
            />
          );
        }}
      />
    </div>
  );
}
