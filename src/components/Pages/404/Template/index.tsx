import * as React from 'react';

import Layout from 'components/Layout/Fetch';
import Post404MetaTags from 'components/Pages/404/Meta/Tags';

interface Page404TemplateProps {
  html: string;
}

export default function Page404Template({ html }: Page404TemplateProps) {
  return (
    <Layout>
      <Post404MetaTags />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}
