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
        <h1>Quality posts to your inbox</h1>
        <p className={styles.newsletterMessage}>
          I publish regularly posts about JavaScript, TypeScript, React, CSS with lots of clear explanations and useful
          tips.
        </p>
        <p>Subscribe to my newsletter to get them right to your inbox.</p>
        <SubscriptionFetch
          render={({ emailSubscriptionService }) => (
            <SubscriptionForm emailSubscriptionService={emailSubscriptionService} />
          )}
        />
      </div>
    </Layout>
  );
}
