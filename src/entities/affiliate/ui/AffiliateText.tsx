import { Affiliate } from '../model/Affiliate'
import { useSelectAffiliate } from '../model/useSelectAffiliate'

interface AffiliateTextProps {
  affiliates: Affiliate[]
  tags: string[]
}

const LINK_PLACEHOLDER = '__LINK__'

export function AffiliateText({ affiliates, tags }: AffiliateTextProps) {
  const affiliate = useSelectAffiliate(affiliates, { tags })

  if (!affiliate) {
    return null
  }

  const html = {
    __html: affiliate.text.replaceAll(LINK_PLACEHOLDER, affiliate.link)
  }

  return <div data-testid="affiliate-text" dangerouslySetInnerHTML={html} />
}