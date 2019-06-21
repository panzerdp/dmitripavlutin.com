import * as React from 'react';
import { TwitterFollowButton } from 'react-twitter-embed';

import styles from './index.module.scss';

interface PostAboutAuthorProps {
  authorInfo: AuthorInfo;
  authorProfilePictureSrc: string;
}

export default function PostAboutAuthor({ authorInfo, authorProfilePictureSrc }: PostAboutAuthorProps) {
  console.log(authorInfo.nicknames.twitter);
  return (
    <div className={styles.aboutAuthor}>
      <div className={styles.profilePicture}>
        <img src={authorProfilePictureSrc} alt={authorInfo.name} />
      </div>
      <div className={styles.authorInfo}>
        <h4>About the author</h4>
        <div className={styles.description}>{authorInfo.description}</div>
        <TwitterFollowButton screenName={authorInfo.nicknames.twitter} />
      </div>
    </div>
  );
}
