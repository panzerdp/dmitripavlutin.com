import * as React from 'react';
import Disqus from 'gatsby-plugin-disqus';

interface PostCommentsProps {
  url: string;
  title: string;
}

export default function PostComments({ url, title }: PostCommentsProps) {
  return (
    <div>
      <Disqus url={url} title={title} />
    </div>
  );
}
