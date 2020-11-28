import Img from 'gatsby-image';

import styles from './index.module.scss';
import TwitterFollowButton from 'components/AboutAuthor/TwitterFollowButton';
import FacebookFollowButton from 'components/AboutAuthor/FacebookFollowButton';

interface AboutAuthorDetailed {
  authorInfo: AuthorInfo;
  authorProfilePicture: FluidImage;
  authorStats: AuthorStats;
}

export default function AboutAuthorDetailed({ authorInfo, authorProfilePicture, authorStats }: AboutAuthorDetailed) {
  return (
    <div className={styles.aboutAuthor}>
      <div className={styles.authorInfo}>
        <Img fluid={authorProfilePicture} alt={authorInfo.name} />
        <h3>About {authorInfo.name}</h3>
        <div className={styles.description}>{authorInfo.description}</div>
        <div className={styles.description}>
          
        </div>
      </div>
      <div className={styles.readMore}>
        <div className={styles.links}>
          <TwitterFollowButton
            authorName={authorInfo.name}
            twitterFollowersCount={authorStats.twitterFollowersCount}
            username={authorInfo.nicknames.twitter}
          />
          <FacebookFollowButton
            authorName={authorInfo.name}
            facebookPageUrl={authorInfo.profiles.facebook}
          />
        </div>
      </div>
    </div>
  );
}
