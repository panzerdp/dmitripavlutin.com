import { Helmet } from 'react-helmet'
import { useEffect } from 'react'

interface LayoutMetaTagsProps {
  siteInfo: SiteInfo;
}

export default function LayoutMetaTags({ siteInfo }: LayoutMetaTagsProps): JSX.Element {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return
    }
    const baseOptimize = document.createElement('script')
    baseOptimize.type = 'text/javascript'
    baseOptimize.async = true
    const timestampAsVersion = Date.now() - Date.now() % 600000
    baseOptimize.src = 'https://cdn4.buysellads.net/pub/dmitripavlutin.js?' + timestampAsVersion
    document.head.appendChild(baseOptimize)
  }, [])

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
