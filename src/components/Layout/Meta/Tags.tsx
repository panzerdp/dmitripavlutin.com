import { Helmet } from 'react-helmet'

interface LayoutMetaTagsProps {
  siteInfo: SiteInfo;
}

export default function LayoutMetaTags({ siteInfo }: LayoutMetaTagsProps): JSX.Element {
  return (
    <Helmet>
      <title>{siteInfo.metaTitle}</title>
      <meta name="description" content={siteInfo.metaDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <meta name="HandheldFriendly" content="True" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="robots" content="index, follow" />
      <html lang="en" />
      <meta name="google-site-verification" content="A3lH-k4h-4bEnJ4lt6BsPuTh5iUck5ElEV5xeyvkCxo" />
    </Helmet>
  )
}
