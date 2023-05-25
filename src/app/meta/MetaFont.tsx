import { Helmet } from 'react-helmet'

export default function LayoutMetaFontTags(): JSX.Element {
  return (
    <Helmet>
      <link rel="preload" href="/fonts/open-sans-v29-latin-700.woff2" as="font" type="font/woff2" />
      <link rel="preload" href="/fonts/roboto-mono-v22-latin-regular.woff2" as="font" type="font/woff2" />
    </Helmet>
  )
}
