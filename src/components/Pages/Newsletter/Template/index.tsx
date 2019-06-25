import * as React from 'react';

import styles from './index.module.scss';
import Layout from 'components/Layout/Fetch';
import SubscribeForm from 'components/Pages/Newsletter/SubscribeForm';
import MetaTags from 'components/Pages/Newsletter/Meta/Tags';

interface NewsletterTemplateProps {
  emailSubscriptionService: EmailSubscriptionService;
  siteInfo: SiteInfo;
}

export default function NewsletterTemplate({ emailSubscriptionService }: NewsletterTemplateProps) {
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
        <SubscribeForm emailSubscriptionService={emailSubscriptionService} />
      </div>
    </Layout>
  );
}
