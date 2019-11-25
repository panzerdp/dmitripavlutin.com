import * as React from 'react';
import { Disqus } from 'gatsby-plugin-disqus';

interface CommentsThreadProps {
  url: string;
  title: string;
  commentsTheadId: string | undefined;
}

export function CommentsThread({ url, title, commentsTheadId }: CommentsThreadProps) {
  const disqusConfig = {
    url: url,
    title: title,
    identifier: commentsTheadId,
  };
  return <Disqus config={disqusConfig} />;
}

export default React.memo(CommentsThread);
