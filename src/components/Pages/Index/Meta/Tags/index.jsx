import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

export default function IndexMetaTags(props) {
  const { data: { site: { siteMetadata }, authorProfilePicture } } = props;
  const imageUrl = `${siteMetadata.siteUrl}${authorProfilePicture.childImageSharp.resize.src}`;
  return (
    <Helmet>
      <title>{siteMetadata.title}</title>
      <meta name="description" content={siteMetadata.description} />

      <link rel="canonical" href={siteMetadata.siteUrl} />
      <meta name="referrer" content="no-referrer-when-downgrade" />

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

IndexMetaTags.propTypes = {
  data: PropTypes.object
};