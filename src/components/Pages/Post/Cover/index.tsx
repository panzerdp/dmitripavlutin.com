import React from 'react';
import Img, { FluidObject } from 'gatsby-image';

import withIntersectionObserver from 'components/With/IntersectionObserver';

interface PostCoverProps {
  className: string;
  thumbnail: FluidObject
}

export function PostCover({ className, thumbnail }: PostCoverProps) {
  console.log(thumbnail);
  return (
    <div className={className}>
      <Img sizes={thumbnail}  />
    </div>
  );
}

export default withIntersectionObserver(PostCover);