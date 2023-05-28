import { useSiteMetadata } from 'hooks/useSiteMetadata'
import { AffiliateBanner } from 'entities/affiliate'

interface Props {
  tags: string[];
}

export function AffiliateBannerInPost({ tags }: Props) {
  const { affiliates } = useSiteMetadata()

  return <AffiliateBanner affiliates={affiliates} tags={tags} />
}