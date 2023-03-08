import { useSiteMetadata } from 'hooks/useSiteMetadata';

interface Props {
  type: string;
  disabled?: boolean;
}

export function AffiliateText({ type, disabled = false }: Props) {
  if (disabled) {
    return null;
  }

  const { affiliates } = useSiteMetadata()
  const affiliate = affiliates.find((affiliate) => affiliate.type === type)

  if (!affiliate) {
    throw new Error(`Unable to find an affiliate of type ${type}`)
  }

  return <div dangerouslySetInnerHTML={{ __html: affiliate.message }} />
}