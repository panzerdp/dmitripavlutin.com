import * as styles from './index.module.scss'
import Layout from 'components/Layout/Fetch'
import { SubscriptionRegion } from 'components/Subscription/Region'
import MetaTags from 'components/Pages/Newsletter/Meta/Tags'
import { NewsletterRightSidebar } from '../RightSidebar'

export default function NewsletterTemplate() {
  return (
    <Layout rightSidebar={<NewsletterRightSidebar />}>
      <MetaTags />
      <div className={styles.newsletter}>
        <h1>Newsletter</h1>
        <div className={styles.subscription}>
          <SubscriptionRegion />
        </div>
      </div>
    </Layout>
  )
}
