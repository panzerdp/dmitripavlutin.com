import { memo } from 'react'

import { TO_ABOUT_ME, TO_TERMS, TO_PRIVACY_POLICY, TO_CONTACT } from 'routes/path'
import * as styles from './Footer.module.scss'

const year = new Date().getFullYear()

interface FooterProps {
  authorInfo: AuthorInfo;
}

export function Footer({ authorInfo: { name } }: FooterProps) {
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
            <a href={TO_TERMS()}>Terms</a>
            <a href={TO_PRIVACY_POLICY()}>Privacy</a>
            <a href={TO_CONTACT()}>Contact</a>
            <a href={TO_ABOUT_ME()}>About</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer)
