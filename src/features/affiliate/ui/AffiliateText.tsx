import { useSiteMetadata } from 'hooks/useSiteMetadata'
import * as styles from './AffiliateText.module.scss'

interface Props {
  type: string;
}

export function AffiliateText({ type }: Props) {
  const { affiliates: { inText } } = useSiteMetadata()
  const affiliate = inText.find((affiliate) => affiliate.type === type)

  if (!affiliate) {
    throw new Error(`Unable to find an affiliate of type ${type}`)
  }

  if (!affiliate.enabled) {
    return null
  }

  return <div className={styles.affiliateText} dangerouslySetInnerHTML={{ __html: affiliate.message }} />
}