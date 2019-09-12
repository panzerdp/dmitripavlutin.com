import * as React from 'react';
import { CommentCount } from 'gatsby-plugin-disqus';

interface CommentsCountProps {
  url: string;
  title: string;
  commentsTheadId: string | undefined;
}

export default function CommentsCount({ url, title, commentsTheadId }: CommentsCountProps) {
  const disqusConfig = {
    url,
    title,
    identifier: commentsTheadId,
  };
  return <CommentCount config={disqusConfig} placeholder="... Comments" />;
}
