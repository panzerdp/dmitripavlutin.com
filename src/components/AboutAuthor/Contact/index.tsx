import styles from './index.module.scss';

interface AboutAuthorContact {
  authorInfo: AuthorInfo;
}

export default function AboutAuthorContact({ authorInfo }: AboutAuthorContact) {
  return (
    <div className={styles.contactAuthor}>
      <h3>Your JavaScript Coach</h3>
      <div className={styles.description}>
        <p>
          I know how cumbersome are closures, scopes, prototypes, inheritance, async functions, <i>this</i> concepts in JavaScript. 
        </p>
        <p>I'm excited to start my coaching program to help you advance your JavaScript knowledge.</p>
        <p>You can have direct access to me through:</p>
        <ul>
          <li>1 hour, one-to-one, video or chat coaching sessions</li>
          <li>JavaScript, TypeScript, React, Next teaching, workshops, or interview preparation (you choose!)</li>
          <li>Conversational and friendly format</li>
        </ul>
      </div>
      <div className={styles.links}>
        <a className={styles.icon} href={`mailto:${authorInfo.email}`} title={`Write a message to ${authorInfo.name}`}>
          <img alt="Email address" src="/icons/email.svg" />
        </a>
        <a className={styles.text} href={`mailto:${authorInfo.email}?subject=Book a JavaScript coaching session`} title={`Write a message to ${authorInfo.name}`}>
          Book a Coaching Session
        </a>
      </div>
    </div>
  );
}
