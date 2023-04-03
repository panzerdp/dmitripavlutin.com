import { useState, useRef } from 'react'
import * as styles from './Form.module.scss'
import fetchJsonp from 'fetch-jsonp'

interface SubscriptionFormProps {
  emailSubscriptionService: EmailSubscriptionService;
}

export const SUBSCRIBERS_COUNT = 7067

type SubscriptionStatus = 'not_subscribed' | 'subscribed' | 'subscribing' | 'subscription_error'

export function SubscriptionForm({
  emailSubscriptionService: { endpoint },
}: SubscriptionFormProps) {
  const [subscribedStatus, setSubscribedStatus] = useState<SubscriptionStatus>('not_subscribed')
  const emailInput = useRef<HTMLInputElement>()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setSubscribedStatus('subscribing')
    const url = new URL(endpoint)
    url.searchParams.set('fields[email]', emailInput.current.value)
    url.searchParams.set('ajax', '1')
    url.searchParams.set('ml-submit', '1')
    let success = false
    try {
      const response = await fetchJsonp(url.href)
      success = response.ok
    } catch (e) {
    }
    setSubscribedStatus(success ? 'subscribed' : 'subscription_error')
  }

  let content: JSX.Element = null
  if (subscribedStatus === 'not_subscribed' || subscribedStatus === 'subscribing') {
    let buttonAttrs = {}
    if (subscribedStatus === 'subscribing') {
      buttonAttrs = { disabled: true }
    }
    content = (
      <>
        <form onSubmit={onSubmit} data-testid="form" className={styles.form}>
          <div className={styles.emailField}>
            <input
              ref={emailInput}
              data-testid="email"
              type="email"
              required
              tabIndex={0}
              className={styles.email}
              placeholder="Enter your email"
            />
          </div>
          <button {...buttonAttrs} type="submit" name="subscribe" className={styles.submit}>
          Subscribe
          </button>
        </form>
        <div className={styles.subscribersCount}>Join {SUBSCRIBERS_COUNT} other subscribers.</div>
      </>
    )
  } else if (subscribedStatus === 'subscribed') {
    content = (
      <div className={styles.subscriptionMessage}>
        <img className={styles.successIcon} src="/icons/check.svg" />
          Subscribed! Check your inbox to confirm the email address.
      </div>
    )
  } else if (subscribedStatus === 'subscription_error') {
    content = (
      <div className={styles.subscriptionMessage}>
        <em>Ooops! An error occured. Please try again later...</em>
      </div>
    )
  }

  return (
    <div className={styles.subscriptionForm}>
      <div className={styles.message}>
        <h2>Quality posts into your inbox</h2>
        <p>I regularly publish posts containing: </p>
        <ul>
          <li>Important JavaScript concepts explained in simple words</li>
          <li>Tutorials on React.js and Hooks</li>
          <li>How to use TypeScript and demistify types</li>
          <li>Software design and good coding practices</li>
        </ul>
        <p>Subscribe to my newsletter to get them right into your inbox.</p>
      </div>
      {content}
    </div>
  )
}
