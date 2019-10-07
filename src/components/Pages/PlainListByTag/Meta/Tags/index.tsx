import * as React from 'react';
import { Helmet } from 'react-helmet';

interface TagMetTagsProps {
  tag: string;
}

export default function TagMetaTags({ tag }: TagMetTagsProps) {
  const capitalizedTag = tag[0].toUpperCase() + tag.slice(1);
  return (
    <Helmet>
      <title>{`${capitalizedTag} posts`}</title>
      <meta name="description" content={`${capitalizedTag} posts`} />
    </Helmet>
  );
}
