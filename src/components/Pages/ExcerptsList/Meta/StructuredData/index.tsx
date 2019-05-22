import * as React from 'react';
import Helmet from 'react-helmet';

interface MetaStructuredData {
  siteInfo: SiteInfo;
  authorProfilePicture: FluidImage;
}

export default function MetaStructuredData({ siteInfo, authorProfilePicture }: MetaStructuredData) {
  const authorProfilePictureUrl = `${siteInfo.url}${authorProfilePicture.src}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    publisher: {
      '@type': 'Organization',
      name: siteInfo.title,
      logo: {
        '@type': 'ImageObject',
        url: authorProfilePictureUrl,
      },
    },
    url: siteInfo.url,
    image: {
      '@type': 'ImageObject',
      url: authorProfilePictureUrl,
      width: 256,
      height: 256,
    },
    description: siteInfo.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': siteInfo.url,
    },
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData, undefined, 2)}</script>
    </Helmet>
  );
}
