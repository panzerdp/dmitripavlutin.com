import * as React from 'react';
import { CommentCount } from 'gatsby-plugin-disqus';

interface PostCommentsCountProps {
  url: string;
  title: string;
  commentsTheadId: string | undefined;
}

export default function PostCommentsCount({ url, title, commentsTheadId }: PostCommentsCountProps) {
  const disqusConfig = {
    url,
    title,
    identifier: commentsTheadId,
  };
  return <CommentCount config={disqusConfig} placeholder="... Comments" />;
}
