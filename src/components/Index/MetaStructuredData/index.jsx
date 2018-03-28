import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

export default function IndexMetaStructuredData(props) {
  const { data: { site: { siteMetadata }, authorProfilePicture } } = props;
  const authorProfilePictureUrl = `${siteMetadata.siteUrl}${authorProfilePicture.childImageSharp.resize.src}`;
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

IndexMetaStructuredData.propTypes = {
  data: PropTypes.object
};