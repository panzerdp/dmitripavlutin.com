import * as styles from './Form.module.scss'

interface SubscriptionFormProps {
  emailSubscriptionService: EmailSubscriptionService;
}

export const SUBSCRIBERS_COUNT = 7067

export function SubscriptionForm({
  emailSubscriptionService: { endpoint },
}: SubscriptionFormProps) {
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    fetch(endpoint)
  }
  return (
    <div className={styles.subscriptionForm}>
      <div className={styles.message}>
        <h2>Quality posts into your inbox</h2>
        <p>I regularly publish posts containing: </p>
        <ul>
          <li>Important JavaScript concepts explained in simple words</li>
          <li>Overview of new JavaScript features</li>
          <li>How to use TypeScript and typing</li>
          <li>Software design and good coding practices</li>
        </ul>
        <p>Subscribe to my newsletter to get them right into your inbox.</p>
      </div>
      <form onSubmit={onSubmit} data-testid="form" className={styles.form}>
        <div className={styles.emailField}>
          <input
            data-testid="email"
            type="email"
            required
            tabIndex={0}
            className={styles.email}
            placeholder="Enter your email"
          />
        </div>
        <button type="submit" name="subscribe" className={styles.submit}>
          Subscribe
        </button>
      </form>
      <div className={styles.subscribersCount}>Join {SUBSCRIBERS_COUNT} other subscribers.</div>
    </div>
  )
}
