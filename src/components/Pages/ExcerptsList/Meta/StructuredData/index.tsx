import * as React from 'react';
import { Helmet } from 'react-helmet';

interface MetaStructuredData {
  siteInfo: SiteInfo;
  authorProfilePictureSrc: string;
}

export default function MetaStructuredData({ siteInfo, authorProfilePictureSrc }: MetaStructuredData) {
  const authorProfilePictureUrl = `${siteInfo.url}${authorProfilePictureSrc}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    publisher: {
      '@type': 'Organization',
      name: siteInfo.metaTitle,
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
