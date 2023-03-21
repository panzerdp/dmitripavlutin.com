import { Helmet } from 'react-helmet'

import { useSiteMetadata } from 'hooks/useSiteMetadata'

export default function AboutMetaTags() {
  const { author } = useSiteMetadata()

  return (
    <Helmet>
      <title>About {author.info.name}</title>
      <meta name="description" content={author.info.description} />
    </Helmet>
  )
}
