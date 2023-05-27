import { useSiteMetadata } from 'hooks/useSiteMetadata'
import * as styles from './AffiliateInPost.module.scss'
import { AffiliateText } from 'entities/affiliate'

interface Props {
  tags: string[];
}

export function AffiliateInPost({ tags }: Props) {
  const { affiliates } = useSiteMetadata()

  return (
    <div className={styles.affiliateText}>
      <AffiliateText affiliates={affiliates} tags={tags} />
    </div>
  )
}