import React from 'react';
import PropTypes from 'prop-types';
import Img from "gatsby-image";

import withIntersectionObserver from 'components/With/IntersectionObserver';

function PostCover({ className, sizes }) {
  return (
    <div className={className}>
      <Img sizes={sizes} />
    </div>
  );
}

PostCover.propTypes = {
  className: PropTypes.string,
  sizes: PropTypes.object
};

export default withIntersectionObserver(PostCover);