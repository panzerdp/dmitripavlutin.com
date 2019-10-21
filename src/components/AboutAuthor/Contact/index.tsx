import * as React from 'react';

import styles from './index.module.scss';

interface AboutAuthorContact {
  authorInfo: AuthorInfo;
}

export default function AboutAuthorContact({ authorInfo }: AboutAuthorContact) {
  return (
    <div className={styles.contactAuthor}>
      <h3>Contact me</h3>
      <div className={styles.description}>
        You&apos;re welcome to contact me regarding job opportunities, discussing a blog post, speaking at conference,
        or just to say thanks.
      </div>
      <div className={styles.links}>
        <a className={styles.icon} href={`mailto:${authorInfo.email}`} title={`Write a message to ${authorInfo.name}`}>
          <img alt="Email address" src="/email.svg" />
        </a>
        <a className={styles.text} href={`mailto:${authorInfo.email}`} title={`Write a message to ${authorInfo.name}`}>
          Write me an email
        </a>
      </div>
    </div>
  );
}
