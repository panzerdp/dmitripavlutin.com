import { GatsbyImage } from 'gatsby-plugin-image'

import AuthorLinks from 'components/AboutAuthor/Links'

import * as styles from './index.module.scss'
import { useSiteMetadata } from 'hooks/useSiteMetadata'

export default function AboutAuthorDetailed() {
  const { author: { info: { name, description, job, email, profiles }, profilePicture } } = useSiteMetadata()

  const jobElement = job ? <p dangerouslySetInnerHTML={{ __html: job }} /> : null
  return (
    <div className={styles.aboutAuthor}>
      <div className={styles.authorInfo}>
        <GatsbyImage image={profilePicture} alt={name} />
        <h3>About {name}</h3>
        <div className={styles.description}>
          {description}
          {jobElement}
        </div>
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
  )
}
