import * as React from 'react';
import { Disqus } from 'gatsby-plugin-disqus';

interface PostCommentsThreadProps {
  url: string;
  title: string;
  commentsTheadId: string | undefined;
}

export function PostCommentsThread({ url, title, commentsTheadId }: PostCommentsThreadProps) {
  const disqusConfig = {
    url: url,
    title: title,
    identifier: commentsTheadId,
  };
  return (
    <div>
      <Disqus config={disqusConfig} />
    </div>
  );
}

export default React.memo(PostCommentsThread);
