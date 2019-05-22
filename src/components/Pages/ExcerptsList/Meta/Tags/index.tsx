import * as React from 'react';
import Helmet from 'react-helmet';

interface MetaTagsProps {
  siteInfo: SiteInfo;
  authorProfilePicture: FluidImage;
}

export default function MetaTags({ siteInfo, authorProfilePicture }: MetaTagsProps) {
  const imageUrl = `${siteInfo.url}${authorProfilePicture.src}`;
  return (
    <Helmet>
      <link rel="canonical" href={siteInfo.url} />

      <meta property="og:site_name" content={siteInfo.title} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteInfo.title} />
      <meta property="og:description" content={siteInfo.description} />
      <meta property="og:url" content={siteInfo.url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="256" />
      <meta property="og:image:height" content="256" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={siteInfo.title} />
      <meta name="twitter:description" content={siteInfo.description} />
      <meta name="twitter:url" content={siteInfo.url} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}
