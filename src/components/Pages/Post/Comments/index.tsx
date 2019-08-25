import * as React from 'react';
import Disqus from 'gatsby-plugin-disqus';

interface PostCommentsProps {
  url: string;
  title: string;
  commentsTheadId: string | undefined;
}

export function PostComments({ url, title, commentsTheadId }: PostCommentsProps) {
  return (
    <div>
      <Disqus url={url} title={title} identifier={commentsTheadId} />
    </div>
  );
}

export default React.memo(PostComments);
