import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

export default function AllPostsMetaTags() {
  return (
    <Helmet>
      <title>All posts</title>
      <meta name="description" content="All posts" />
    </Helmet>
  );
}

AllPostsMetaTags.propTypes = {
  data: PropTypes.object
};