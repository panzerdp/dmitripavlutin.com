import * as React from 'react';

import styles from './index.module.scss';
import Layout from 'components/Layout/Fetch';
import SubscriptionForm from 'components/Subscription/Form';
import SubscriptionFetch from 'components/Subscription/Fetch';
import MetaTags from 'components/Pages/Newsletter/Meta/Tags';

export default function NewsletterTemplate() {
  return (
    <Layout>
      <MetaTags />
      <div className={styles.newsletter}>
        <h1>Newsletter</h1>
        <SubscriptionFetch
          render={({ emailSubscriptionService }) => (
            <SubscriptionForm emailSubscriptionService={emailSubscriptionService} />
          )}
        />
      </div>
    </Layout>
  );
}
