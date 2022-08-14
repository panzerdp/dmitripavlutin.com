import { Helmet } from 'react-helmet';

interface LayoutMetaTagsProps {
  siteInfo: SiteInfo;
}

export default function LayoutMetaTags({ siteInfo }: LayoutMetaTagsProps): JSX.Element {
  const fontsUrl = '//fonts.googleapis.com/css?family=Open+Sans:700|EB+Garamond:400,400i,600,700|Roboto+Mono:400&display=swap'
  return (
    <Helmet>
      <link rel="preconnect" href="//fonts.gstatic.com/" crossOrigin="" />
      <title>{siteInfo.metaTitle}</title>
      <meta name="description" content={siteInfo.metaDescription} />
      <link href={fontsUrl} rel="stylesheet" type="text/css" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <meta name="HandheldFriendly" content="True" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="robots" content="index, follow" />
      <html lang="en" />
      <meta name="google-site-verification" content="A3lH-k4h-4bEnJ4lt6BsPuTh5iUck5ElEV5xeyvkCxo" />
    </Helmet>
  );
}
