import * as React from 'react';
import Img from 'gatsby-image';

import styles from './index.module.scss';
import TwitterFollowButton from 'components/AboutAuthor/TwitterFolowButton';

interface AboutAuthorDetailed {
  authorInfo: AuthorInfo;
  authorStats: AuthorStats;
  authorProfilePicture: FluidImage;
}

export default function AboutAuthorDetailed({ authorInfo, authorStats, authorProfilePicture }: AboutAuthorDetailed) {
  return (
    <div className={styles.aboutAuthor}>
      <div className={styles.authorInfo}>
        <Img fluid={authorProfilePicture} alt={authorInfo.name} />
        <h3>About the author</h3>
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
