import * as React from 'react';
import Helmet from 'react-helmet';

interface MetaTagsProps {
  siteMetadata: SiteMetadata;
  authorProfilePicture: FluidImage;
}

export default function MetaTags({ siteMetadata, authorProfilePicture }: MetaTagsProps) {
  const imageUrl = `${siteMetadata.siteUrl}${authorProfilePicture.src}`;
  return (
    <Helmet>
      <link rel="canonical" href={siteMetadata.siteUrl} />

      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteMetadata.title} />
      <meta property="og:description" content={siteMetadata.description} />
      <meta property="og:url" content={siteMetadata.siteUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="256" />
      <meta property="og:image:height" content="256" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={siteMetadata.title} />
      <meta name="twitter:description" content={siteMetadata.description} />
      <meta name="twitter:url" content={siteMetadata.siteUrl} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}
