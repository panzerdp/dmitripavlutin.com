import * as React from 'react';

import styles from './index.module.scss';

interface SubscriptionFormProps {
  emailSubscriptionService: EmailSubscriptionService;
}

export default function SubscriptionForm({
  emailSubscriptionService: { endpoint, hiddenFieldName },
}: SubscriptionFormProps) {
  return (
    <div className={styles.subscriptionForm}>
      <div className={styles.message}>
        <h2>Quality posts into your inbox</h2>
        <p>I regularly publish posts containing: </p>
        <ul>
          <li>Important JavaScript concepts explained in simple words</li>
          <li>Overview of new JavaScript features</li>
          <li>React best practices and design patterns</li>
        </ul>
        <p>Subscribe to my newsletter to get them right into your inbox.</p>
      </div>
      <form action={endpoint} method="post" name="mc-embedded-subscribe-form" target="_blank" className={styles.form}>
        <div className={styles.emailField}>
          <input type="email" name="EMAIL" tabIndex={0} className={styles.email} placeholder="Enter your email" />
        </div>
        <button type="submit" name="subscribe" className={styles.submit}>
          Subscribe
        </button>
        <div aria-hidden="true" className={styles.hiddenField}>
          <input type="text" name={hiddenFieldName} tabIndex={-1} />
        </div>
      </form>
    </div>
  );
}
