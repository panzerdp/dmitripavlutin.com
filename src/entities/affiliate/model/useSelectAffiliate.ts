import { Affiliate } from './Affiliate'

export interface SelectQuery {
  tags: string[]
}

export function useSelectAffiliate(affiliates: Affiliate[], { tags }: SelectQuery): Affiliate | undefined {
  return affiliates.find(affiliate => {
    return intersects(affiliate.tags, tags)
  })
}

function intersects(array1: string[], array2: string[]) {
  return array1.find(item => array2.includes(item))
}