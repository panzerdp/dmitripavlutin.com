import * as React from 'react';
import Img from 'gatsby-image';

import styles from './index.module.scss';
import TwitterFollowButton from 'components/AboutAuthor/TwitterFolowButton';

interface AboutAuthorConcise {
  authorInfo: AuthorInfo;
  authorStats: AuthorStats;
  authorProfilePicture: FixedImage;
}

export default function AboutAuthorConcise({ authorInfo, authorStats, authorProfilePicture }: AboutAuthorConcise) {
  return (
    <div className={styles.aboutAuthor}>
      <div className={styles.profilePicture}>
        <Img fixed={authorProfilePicture} alt={authorInfo.name} />
      </div>
      <div className={styles.authorInfo}>
        <h4>About the author</h4>
        <div className={styles.description}>{authorInfo.description}</div>
        <TwitterFollowButton
          authorName={authorInfo.name}
          twitterFollowersCount={authorStats.twitterFollowersCount}
          username={authorInfo.nicknames.twitter}
        />
      </div>
    </div>
  );
}
