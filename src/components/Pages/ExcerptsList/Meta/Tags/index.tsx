import * as React from 'react';
import { Helmet } from 'react-helmet';

interface MetaTagsProps {
  siteInfo: SiteInfo;
  authorProfilePictureSrc: string;
  currentPage: number;
}

export default function MetaTags({ siteInfo, authorProfilePictureSrc, currentPage }: MetaTagsProps) {
  let metaTitle = siteInfo.metaTitle;
  let metaDescription = siteInfo.metaDescription;
  if (currentPage > 1) {
    metaTitle = `${metaTitle}, page ${currentPage}`;
    metaDescription = `${metaDescription}, page ${currentPage}`;
  }
  const imageUrl = `${siteInfo.url}${authorProfilePictureSrc}`;
  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:site_name" content={siteInfo.metaTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteInfo.metaTitle} />
      <meta property="og:description" content={siteInfo.metaDescription} />
      <meta property="og:url" content={siteInfo.url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="256" />
      <meta property="og:image:height" content="256" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={siteInfo.metaTitle} />
      <meta name="twitter:description" content={siteInfo.metaDescription} />
      <meta name="twitter:url" content={siteInfo.url} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}
