import * as React from 'react';

import styles from './index.module.scss';

import SubscriptionFetch from 'components/Subscription/Fetch';
import SubscriptionForm from 'components/Subscription/Form';

export default function PostRightSidebar() {
  return (
    <div className={styles.rightSidebar}>
      <div className={styles.subscription}>
        <div className={styles.message}>
          <h3>Quality posts to your inbox</h3>
          <p>I publish regularly worth reading posts about Frontend tech stack.</p>
          <p>Subscribe to my newsletter to get them right to your inbox.</p>
        </div>
        <SubscriptionFetch
          render={({ emailSubscriptionService }) => (
            <SubscriptionForm emailSubscriptionService={emailSubscriptionService} />
          )}
        />
      </div>
    </div>
  );
}
