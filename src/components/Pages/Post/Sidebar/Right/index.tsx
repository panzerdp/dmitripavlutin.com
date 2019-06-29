import * as React from 'react';

import styles from './index.module.scss';

import SubscriptionFetch from 'components/Subscription/Fetch';
import SubscriptionForm from 'components/Subscription/Form';

export default function PostRightSidebar() {
  return (
    <div className={styles.rightSidebar}>
      <SubscriptionFetch
        render={({ emailSubscriptionService }) => (
          <SubscriptionForm emailSubscriptionService={emailSubscriptionService} />
        )}
      />
    </div>
  );
}
