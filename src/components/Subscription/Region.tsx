import { EmailSubscriptionQuery } from 'graphql-types'
import { SubscriptionForm } from './Form'
import * as styles from './Region.module.scss'
import { graphql, useStaticQuery } from 'gatsby'

export function SubscriptionRegion() {
  const { site: { siteMetadata: { emailSubscriptionService } }, mailerliteStats } = useStaticQuery<EmailSubscriptionQuery>(graphql`
    query EmailSubscription {
      site {
        siteMetadata {
          emailSubscriptionService {
            embedFormEndpoint
            pageFormUrl
            isFormEmbed
          }
        }
      }
      mailerliteStats {
        subscribersCount
      }
    }`
  )
  const { embedFormEndpoint, pageFormUrl, isFormEmbed } = emailSubscriptionService
  const { subscribersCount } = mailerliteStats

  return (
    <div className={styles.subscriptionRegion}>
      <div className={styles.message}>
        <h2>Quality posts into your inbox</h2>
        <p>I regularly publish posts containing: </p>
        <ul>
          <li>Important JavaScript concepts explained in simple words</li>
          <li>Tutorials to master React.js and Hooks</li>
          <li>How to use TypeScript and demistify types</li>
          <li>Software design and good coding practices</li>
        </ul>
        <p>Subscribe to my newsletter to get them right into your inbox.</p>
      </div>
      {
        isFormEmbed
          ? <SubscriptionForm embedFormEndpoint={embedFormEndpoint} />
          : <a href={pageFormUrl} className={styles.subscribeFormLink} target="_blank" rel="noreferrer">Subscribe</a>
      }
      <div className={styles.subscribersCount}>Join {subscribersCount} other subscribers.</div>
    </div>
  )
}
