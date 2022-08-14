import { Helmet } from 'react-helmet';

export default function LayoutMetaFontTags(): JSX.Element {
  const fontsUrl = '//fonts.googleapis.com/css?family=Open+Sans:700|Roboto+Mono:400&display=swap'
  return (
    <Helmet>
      <link rel="preconnect" href="//fonts.gstatic.com/" crossOrigin="" />
      <link href={fontsUrl} rel="stylesheet"  />
    </Helmet>
  );
}
