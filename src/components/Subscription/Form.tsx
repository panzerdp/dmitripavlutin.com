import { useState, useRef } from 'react'
import * as styles from './Form.module.scss'
import fetchJsonp from 'fetch-jsonp'

interface SubscriptionFormProps {
  embedFormEndpoint: string;
}

type SubscriptionStatus = 'not_subscribed' | 'subscribed' | 'subscribing' | 'subscription_error'

export function SubscriptionForm({ embedFormEndpoint }: SubscriptionFormProps) {
  const [subscribedStatus, setSubscribedStatus] = useState<SubscriptionStatus>('not_subscribed')
  const emailInput = useRef<HTMLInputElement>()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setSubscribedStatus('subscribing')
    const url = new URL(embedFormEndpoint)
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

  let content: JSX.Element

  if (subscribedStatus === 'subscribed') {
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
  } else {
    let buttonAttrs = { }
    if (subscribedStatus === 'subscribing') {
      buttonAttrs = { disabled: true }
    }
    content = (
      <form onSubmit={onSubmit} data-testid="form" className={styles.form}>
        <input
          ref={emailInput}
          data-testid="email"
          type="email"
          required
          tabIndex={0}
          className={styles.emailField}
          placeholder="Enter your email"
        />
        <button {...buttonAttrs} type="submit" name="subscribe" className={styles.submit}>
          Subscribe
        </button>
      </form>
    )
  }

  return (
    <div className={styles.subscriptionForm}>
      {content}
    </div>
  )
}
