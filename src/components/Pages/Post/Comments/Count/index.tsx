import * as React from 'react';
import { CommentCount } from 'gatsby-plugin-disqus';

interface PostCommentsCountProps {
  url: string;
  title: string;
  commentsTheadId: string | undefined;
}

export function PostCommentsCount({ url, title, commentsTheadId }: PostCommentsCountProps) {
  const disqusConfig = {
    url,
    identifier: commentsTheadId,
    title,
  };
  return <CommentCount config={disqusConfig} placeholder="... Comments" />;
}

export default React.memo(PostCommentsCount);
