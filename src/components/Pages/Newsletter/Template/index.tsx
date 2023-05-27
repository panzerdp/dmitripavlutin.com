import * as styles from './index.module.scss'
import { App } from 'app'
import { SubscriptionRegion } from 'components/Subscription/Region'
import MetaTags from 'components/Pages/Newsletter/Meta/Tags'
import { NewsletterRightSidebar } from '../RightSidebar'

export default function NewsletterTemplate() {
  return (
    <App rightSidebar={<NewsletterRightSidebar />}>
      <MetaTags />
      <div className={styles.newsletter}>
        <h1>Newsletter</h1>
        <div className={styles.subscription}>
          <SubscriptionRegion />
        </div>
      </div>
    </App>
  )
}
