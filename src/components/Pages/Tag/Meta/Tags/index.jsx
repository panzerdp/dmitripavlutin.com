import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

export default function TagMetaTags({ tag }) {
  const capitalizedTag = tag[0].toUpperCase() + tag.slice(1);
  return (
    <Helmet>
      <title>{`${capitalizedTag} posts`}</title>
      <meta name="description" content={`${capitalizedTag} posts`} />
    </Helmet>
  );
}

TagMetaTags.propTypes = {
  tag: PropTypes.string
};