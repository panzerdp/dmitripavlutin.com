import * as React from 'react';

import styles from './index.module.scss';
import withWindowOpen, { WindowOpenOptions } from 'components/With/WindowOpen';

const TWITTER_FOLLOW_URL = 'https://twitter.com/intent/user?screen_name=';

interface TwitterFollowButtonProps {
  twitterFollowersCount: string;
  username: string;
  authorName: string;
  windowOpen?(props: WindowOpenOptions): void;
}

export function TwitterFollowButton({
  twitterFollowersCount,
  username,
  authorName,
  windowOpen,
}: TwitterFollowButtonProps): JSX.Element {
  const url = TWITTER_FOLLOW_URL + username;
  function openFollowWindow(event: React.MouseEvent) {
    event.preventDefault();
    windowOpen({
      name: `${authorName} (${username}) on Twitter`,
      url,
      width: 550,
      height: 500,
    });
  }
  return (
    <div className={styles.hcount}>
      <div className={styles.widget}>
        <div className={styles.btnO}>
          <a
            className={`${styles.btn} ${styles.followButton}`}
            title={`Follow ${authorName} (${username}) on Twitter`}
            href={url}
            onClick={openFollowWindow}
          >
            <i></i>
            <span className={styles.label}>
              Follow <b>@{username}</b>
            </span>
          </a>
        </div>
        <div className={styles.countO} data-scribe="component:count">
          <i></i>
          <u></u>
          <a className={`${styles.count} ${styles.note}`} href={url} onClick={openFollowWindow}>
            {twitterFollowersCount} followers
          </a>
        </div>
      </div>
    </div>
  );
}

export default withWindowOpen(TwitterFollowButton);
