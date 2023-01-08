import { GatsbyImage } from 'gatsby-plugin-image';

import * as styles from './index.module.scss';
import AuthorLinks from 'components/AboutAuthor/Links';
import { useAuthorAndSiteInfo } from 'hooks/useAuthorAndSiteInfo';

export default function AboutAuthorConcise() {
  const { author: { info: { name, description, job, email, profiles }, profilePicture } } = useAuthorAndSiteInfo();

  const jobElement = job ? <p dangerouslySetInnerHTML={{ __html: job }} /> : null
  return (
    <div className={styles.aboutAuthor}>
      <div className={styles.profilePicture}>
        <GatsbyImage image={profilePicture} alt={name} />
      </div>
      <div className={styles.authorInfo}>
        <h4>About {name}</h4>
        <div className={styles.description}>
          {description}
          {jobElement}         
        </div>
        <div className={styles.links}>
          <AuthorLinks>
            <a href={`mailto:${email}`} title={`Send an email to ${name}`}>
              <img width="20" height="20" alt="Email address" src="/icons/email.svg" />
            </a>
            <a href={profiles.twitter} title={`${name}'s Twitter profile`}>
              <img width="20" height="20" alt="Twitter profile" src="/icons/twitter.svg" />
            </a>
            <a href={profiles.facebook} title={`${name}'s Facebook page`}>
              <img width="20" height="20" alt="Facebook page" src="/icons/facebook.svg" />
            </a>
            <a href={profiles.linkedin} title={`${name}'s Linkedin profile`}>
              <img width="20" height="20" alt="LinkedIn profile" src="/icons/linkedin.svg" />
            </a>
          </AuthorLinks>
        </div>
      </div>
    </div>
  );
}
