import Img from 'gatsby-image';

import styles from './index.module.scss';
import TwitterFollowButton from 'components/AboutAuthor/TwitterFollowButton';

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
        <h4>About {authorInfo.name}</h4>
        <div className={styles.description}>{authorInfo.description}</div>
        <div className={styles.links}>
          <a
            className={styles.icon}
            href={`mailto:${authorInfo.email}`}
            title={`Write a message to ${authorInfo.name}`}
          >
            <img alt="Email address" src="/icons/email.svg" />
          </a>
          <a
            className={styles.text}
            href={`mailto:${authorInfo.email}`}
            title={`Write a message to ${authorInfo.name}`}
          >
            Write me an email
          </a>
        </div>
        <TwitterFollowButton
          authorName={authorInfo.name}
          twitterFollowersCount={authorStats.twitterFollowersCount}
          username={authorInfo.nicknames.twitter}
        />
      </div>
    </div>
  );
}
