import Img from 'gatsby-image';

import AuthorLinks from 'components/AboutAuthor/Links';

import styles from './index.module.scss';

interface AboutAuthorDetailed {
  authorInfo: AuthorInfo;
  authorProfilePicture: FluidImage;
  authorStats: AuthorStats;
}

export default function AboutAuthorDetailed({ authorInfo: { profiles, email, description, name }, authorProfilePicture }: AboutAuthorDetailed) {
  return (
    <div className={styles.aboutAuthor}>
      <div className={styles.authorInfo}>
        <Img fluid={authorProfilePicture} alt={name} />
        <h3>About {name}</h3>
        <div className={styles.description}>{description}</div>
      </div>
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
  );
}
