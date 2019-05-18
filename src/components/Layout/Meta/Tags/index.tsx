import React from 'react';
import Helmet from 'react-helmet';

interface LayoutMetaTagsProps {
  siteMetadata: SiteMetadata;
}

export default function LayoutMetaTags({ siteMetadata }: LayoutMetaTagsProps) {
  return (
    <Helmet>
      <title>{siteMetadata.title}</title>
      <meta name="description" content={siteMetadata.description} />
      <link href="//fonts.googleapis.com/css?family=Open+Sans:700|EB+Garamond:400,400i,600,700|Roboto+Mono:400" rel="stylesheet" type="text/css" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <meta name="HandheldFriendly" content="True" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
    </Helmet>
  );
}