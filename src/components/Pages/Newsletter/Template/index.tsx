import styles from './index.module.scss';
import Layout from 'components/Layout/Fetch';
import SubscriptionRegion from 'components/Subscription/Region';
import MetaTags from 'components/Pages/Newsletter/Meta/Tags';

export default function NewsletterTemplate() {
  return (
    <Layout>
      <MetaTags />
      <div className={styles.newsletter}>
        <h1>Newsletter</h1>
        <SubscriptionRegion />
      </div>
    </Layout>
  );
}
