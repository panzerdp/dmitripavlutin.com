// import { Link } from 'gatsby-link'
import { memo } from 'react'

import { TO_ABOUT_ME, TO_ALL_POSTS, TO_INDEX, TO_NEWSLETTER, TO_RSS, TO_SEARCH } from 'routes/path'
import AuthorLinks from 'components/AboutAuthor/Links'
import * as styles from './index.module.scss'

const year = new Date().getFullYear()

interface FooterProps {
  authorInfo: AuthorInfo;
}

export function Footer({ authorInfo: { profiles, name, email } }: FooterProps) {
  return (
    <footer>
      <div className={styles.footerContent}>
        <div className={styles.copyright}>
          <div>
            © {year} {name}
          </div>
          <div className={styles.license}>
            Licensed under <a href="http://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
          </div>
        </div>
        <div className={styles.links}>
          <div className={styles.footerNavigation}>
            <a href={TO_INDEX()}>Home</a>
            <a href={TO_NEWSLETTER()}>Newsletter</a>
            <a href={TO_RSS()}>RSS</a>
            <a href={TO_ALL_POSTS()}>All posts</a>
            <a href={TO_SEARCH()}>Search</a>
            <a href={TO_ABOUT_ME()}>About</a>
          </div>
          <AuthorLinks className={styles.footerAuthorLinks}>
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
            <a href={profiles.stackoverflow} title={`${name}'s Stackoverflow profile`}>
              <img width="20" height="20" alt="Stackoverflow profile" src="/icons/stackoverflow.svg" />
            </a>
            <a href={profiles.github} title={`${name}'s Github profile`}>
              <img width="20" height="20" alt="Github profile" src="/icons/github.svg" />
            </a>
          </AuthorLinks>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer)
