import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

export default function LayoutMetaTags({ siteMetadata: { title, description } }) {
  return (
    <Helmet
      titleTemplate={`${title}: %s`}
      defaultTitle={title}
    >
      <meta name="description" content={description} />
      <link href="//fonts.googleapis.com/css?family=Open+Sans:700|EB+Garamond:400,400i,600,700|Roboto+Mono:400" rel="stylesheet" type="text/css" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <meta name="HandheldFriendly" content="True" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
    </Helmet>
  );
}

LayoutMetaTags.propTypes = {
  siteMetadata: PropTypes.object
};