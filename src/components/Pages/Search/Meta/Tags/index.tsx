import * as React from 'react';
import { Helmet } from 'react-helmet';

interface SearchMetaTagsProps {
  googleCustomSearchId: string;
}

export default function PostMetaTags({ googleCustomSearchId }: SearchMetaTagsProps) {
  return (
    <Helmet titleTemplate="%s">
      <title>Search</title>
      <meta name="description" content="Search for a post" />
      <script async src={`https://cse.google.com/cse.js?cx=${googleCustomSearchId}`}></script>
    </Helmet>
  );
}
