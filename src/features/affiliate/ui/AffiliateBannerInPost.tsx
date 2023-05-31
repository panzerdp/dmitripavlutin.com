import { useFeatureValue } from '@growthbook/growthbook-react'
import { useSiteMetadata } from 'hooks/useSiteMetadata'
import { AffiliateBanner } from 'entities/affiliate'

interface Props {
  tags: string[];
}

export function AffiliateBannerInPost({ tags }: Props) {
  const value = useFeatureValue('affiliateversion', 'default')

  const { affiliates } = useSiteMetadata()

  return <AffiliateBanner affiliates={affiliates} tags={tags} />
}