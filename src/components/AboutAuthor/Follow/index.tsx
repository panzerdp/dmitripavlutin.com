import * as React from 'react';

import styles from './index.module.scss';

import TwitterFollowButton from 'components/AboutAuthor/TwitterFolowButton';

interface AboutAuthorFollow {
  authorInfo: AuthorInfo;
  authorStats: AuthorStats;
}

export default function AboutAuthorFollow({ authorInfo, authorStats }: AboutAuthorFollow) {
  return (
    <div className={styles.folowAuthor}>
      <h3>Follow me</h3>
      <div className={styles.description}>Follow me to stay in touch with new interesting posts.</div>
      <TwitterFollowButton
        authorName={authorInfo.name}
        twitterFollowersCount={authorStats.twitterFollowersCount}
        username={authorInfo.nicknames.twitter}
      />
    </div>
  );
}
