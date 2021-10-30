import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

import * as styles from './index.module.scss';
import AuthorLinks from 'components/AboutAuthor/Links';

interface AboutAuthorConcise {
  authorInfo: AuthorInfo;
  authorProfilePicture: IGatsbyImageData;
}

export default function AboutAuthorConcise({ authorInfo: { name, description, email, profiles }, authorProfilePicture }: AboutAuthorConcise) {
  return (
    <div className={styles.aboutAuthor}>
      <div className={styles.profilePicture}>
        <GatsbyImage image={authorProfilePicture} alt={name} />
      </div>
      <div className={styles.authorInfo}>
        <h4>About {name}</h4>
        <div className={styles.description}>{description}</div>
        <div className={styles.links}>
          <AuthorLinks>
            <a href={`mailto:${email}`} title={`Send an email to ${name}`}>
              <img alt="Email address" src="/icons/email.svg" />
            </a>
            <a href={profiles.twitter} title={`${name}'s Twitter profile`}>
              <img alt="Twitter profile" src="/icons/twitter.svg" />
            </a>
            <a href={profiles.facebook} title={`${name}'s Facebook page`}>
              <img alt="Facebook page" src="/icons/facebook.svg" />
            </a>
            <a href={profiles.linkedin} title={`${name}'s Linkedin profile`}>
              <img alt="LinkedIn profile" src="/icons/linkedin.svg" />
            </a>
          </AuthorLinks>
        </div>
      </div>
    </div>
  );
}
