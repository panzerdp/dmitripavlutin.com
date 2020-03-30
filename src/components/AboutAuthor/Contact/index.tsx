import * as React from 'react';

import styles from './index.module.scss';

interface AboutAuthorContact {
  authorInfo: AuthorInfo;
}

export default function AboutAuthorContact({ authorInfo }: AboutAuthorContact) {
  return (
    <div className={styles.contactAuthor}>
      <h3>JavaScript Personal Training</h3>
      <div className={styles.description}>
        <p>
          I know how cumbersome are closures, prototypes, hoisting, <i>this</i>, and other JavaScript concepts. 
        </p>
        <p>
          Book a personal JavaScript training session and I will help you overcome the difficulties.  
        </p>
      </div>
      <div className={styles.links}>
        <a className={styles.icon} href={`mailto:${authorInfo.email}`} title={`Write a message to ${authorInfo.name}`}>
          <img alt="Email address" src="/icons/email.svg" />
        </a>
        <a className={styles.text} href={`mailto:${authorInfo.email}?subject=Book a JavaScript training session`} title={`Write a message to ${authorInfo.name}`}>
          Book a Training Session
        </a>
      </div>
    </div>
  );
}
