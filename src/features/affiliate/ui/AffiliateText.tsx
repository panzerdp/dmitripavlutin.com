import { useSiteMetadata } from 'hooks/useSiteMetadata';

interface Props {
  type: string;
}

export function AffiliateText({ type }: Props) {
  const { affiliates } = useSiteMetadata()

  const affiliate = affiliates.find((affiliate) => affiliate.type === type)

  if (!affiliate) {
    throw new Error(`Unable to find an affiliate of type ${type}`)
  }

  return <div dangerouslySetInnerHTML={{ __html: affiliate.message }} />
}