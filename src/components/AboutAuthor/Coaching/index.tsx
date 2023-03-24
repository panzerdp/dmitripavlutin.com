import * as styles from './index.module.scss'

export default function Coaching(): JSX.Element {
  const CALENDLY_BOOKING = 'https://calendly.com/dmitripavlutin/60min'

  return (
    <div className={styles.contactAuthor}>
      <h3>Your JavaScript Coach</h3>
      <div className={styles.description}>
        <p>
          I know how cumbersome are closures, scopes, prototypes, inheritance, async functions, <i>this</i> in JavaScript.
        </p>
        <p>I&apos;m excited to start my coaching program to help you advance your JavaScript knowledge.</p>
        <p>You can have direct access to me through:</p>
        <ul>
          <li>1 hour, one-to-one, video or chat coaching sessions</li>
          <li>JavaScript, TypeScript, React or Vue teaching, workshops, or interview preparation (you choose!)</li>
          <li>Conversational and friendly format</li>
        </ul>
      </div>
      <div className={styles.links}>
        <a className={styles.book} href={CALENDLY_BOOKING} title="Book JavaScript Session" target="_blank" rel="noreferrer">
          <img className={styles.calendarIcon} alt="Calendar" src="/icons/calendar-check.svg" /> Book a Coaching Session
        </a>
      </div>
    </div>
  )
}
