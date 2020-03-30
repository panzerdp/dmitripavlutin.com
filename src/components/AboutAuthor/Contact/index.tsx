import * as React from 'react';

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
          I know how cumbersome are JavaScript concepts like closures, prototypes, hoisting, <i>this</i>.   
        </p>
        <p>Let me be your JavaScript coach:</p>
        <ul>
          <li>I will help you overcome your difficulties in understanding JavaScript</li>
          <li>One-to-one, remote, 1 hour sessions</li>
          <li>Informal, conversational and friendly format</li>
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
