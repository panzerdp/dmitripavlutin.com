import { Affiliate } from '../model/Affiliate'

interface AffiliateTextProps {
  affiliate: Affiliate
}

const LINK_PLACEHOLDER = '__LINK__'

export function AffiliateText({ affiliate }: AffiliateTextProps) {
  const html = {
    __html: affiliate.text.replaceAll(LINK_PLACEHOLDER, affiliate.link)
  }

  return <div data-testid="affiliate-text" dangerouslySetInnerHTML={html} />
}