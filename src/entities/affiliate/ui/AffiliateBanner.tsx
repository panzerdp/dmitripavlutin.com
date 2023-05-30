import { Affiliate } from '../model/Affiliate'
import { useSelectAffiliate } from '../model/useSelectAffiliate'
import * as styles from './AffiliateBanner.module.scss'

interface AffiliateBannerProps {
  affiliates: Affiliate[]
  tags: string[]
}

const URL_PLACEHOLDER = '__URL__'

export function AffiliateBanner({ affiliates, tags }: AffiliateBannerProps) {
  const affiliate = useSelectAffiliate(affiliates, { tags })

  if (!affiliate) {
    return null
  }

  const html = {
    __html: affiliate.text.replaceAll(URL_PLACEHOLDER, affiliate.url)
  }

  return (
    <div className={styles.affiliateBanner}>
      <div className={styles.affiliateBanner__text} data-testid="affiliate-text" dangerouslySetInnerHTML={html} />
      <a className={styles.affiliateBanner__action} href={affiliate.url} title="Start Learning" target="_blank" rel="noreferrer">
        Visit Course
      </a>
    </div>
  )
}