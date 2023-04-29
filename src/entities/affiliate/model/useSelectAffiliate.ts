import { Affiliate, AffiliatePosition } from './Affiliate'

export interface SelectQuery {
  tags: string[]
  position: AffiliatePosition
}

export function useSelectAffiliate(affiliates: Affiliate[], { tags, position }: SelectQuery): Affiliate | undefined {
  return affiliates.find(affiliate => {
    return position === affiliate.position && intersects(affiliate.applyOn.tags, tags)
  })
}

function intersects(array1: string[], array2: string[]) {
  return array1.find(item => array2.includes(item))
}