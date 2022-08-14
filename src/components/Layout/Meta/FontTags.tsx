import { Helmet } from 'react-helmet';

export default function LayoutMetaFontTags(): JSX.Element {
  const fontsUrl = '//fonts.googleapis.com/css?family=Open+Sans:700|EB+Garamond:400,400i,600,700|Roboto+Mono:400&display=swap'
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="//fonts.gstatic.com/" crossOrigin="" />
        <link href={fontsUrl} rel="preload" as="style" />
        <link href={fontsUrl} rel="stylesheet" media="print" onLoad="this.media='all'" />
      </Helmet>
      <noscript>
        <link href={fontsUrl} rel="stylesheet" />
      </noscript>
    </>
  );
}
