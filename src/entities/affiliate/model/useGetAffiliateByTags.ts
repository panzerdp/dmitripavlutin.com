import { Affiliate } from './Affiliate'

export function useGetAffiliateByTags(affiliates: Affiliate[], tags: string[]): Affiliate | undefined {
  return affiliates.find(affiliate => {
    return affiliate.enabled && intersects(affiliate.applyOn.tags, tags)
  })
}

function intersects(array1: string[], array2: string[]) {
  return array1.find(item => array2.includes(item))
}