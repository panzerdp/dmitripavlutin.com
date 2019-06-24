import * as React from 'react';

import styles from './index.module.scss';
import Layout from 'components/Layout/Fetch';
import SubscribeForm from 'components/Pages/Newsletter/SubscribeForm';

interface NewsletterTemplateProps {
  emailSubscriptionService: EmailSubscriptionService;
  siteInfo: SiteInfo;
}

export default function NewsletterTemplate({ emailSubscriptionService }: NewsletterTemplateProps) {
  return (
    <Layout>
      <h1>Frontend Dev Tips to Your Inbox</h1>
      <p className={styles.newsletterMessage}>
        <i>Do you struggle to be in sync with the fast evolving Frontend tech stack?</i> If yes, then I might help you.
      </p>

      <p className={styles.newsletterMessage}>
        I publish regularly posts about JavaScript, TypeScript, React, CSS with lots of clear explanations and useful
        tips. Subscribe to my newsletter to get them right to your inbox.
      </p>
      <SubscribeForm emailSubscriptionService={emailSubscriptionService} />
    </Layout>
  );
}
