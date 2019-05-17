import React from 'react';
import Helmet from 'react-helmet';

interface MetaStructuredData {
  siteMetadata: SiteMetadata;
  authorProfilePicture: FluidImage;
}

export default function MetaStructuredData({ siteMetadata, authorProfilePicture }: MetaStructuredData) {
  const authorProfilePictureUrl = `${siteMetadata.siteUrl}${authorProfilePicture.src}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Website",
    "publisher": {
      "@type": "Organization",
      "name": siteMetadata.title,
      "logo": {
        "@type": "ImageObject",
        "url": authorProfilePictureUrl
      }
    },
    "url": siteMetadata.siteUrl,
    "image": {
      "@type": "ImageObject",
      "url": authorProfilePictureUrl,
      "width": 256,
      "height": 256
    },
    "description": siteMetadata.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": siteMetadata.siteUrl
    }
  };
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData, undefined, 2)}
      </script>
    </Helmet>
  );
}