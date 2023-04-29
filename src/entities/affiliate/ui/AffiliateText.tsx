import { Affiliate } from '../model/Affiliate'

interface AffiliateTextProps {
  affiliate: Affiliate
  currentTags: string[]
}

const LINK_PLACEHOLDER = '__LINK__'

export function AffiliateText({ affiliate, currentTags }: AffiliateTextProps) {
  const html = {
    __html: affiliate.text.replaceAll(LINK_PLACEHOLDER, affiliate.link)
  }

  const containsCurrentTag = affiliate.applyOn.tags.some((tag) => currentTags.includes(tag))
  if (!containsCurrentTag) {
    return null
  }

  return <div data-testid="affiliate-text" dangerouslySetInnerHTML={html} />
}