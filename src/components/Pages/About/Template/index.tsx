import * as React from 'react';

import Layout from 'components/Layout/Fetch';
import AboutMetaTags from 'components/Pages/About/Meta/Tags';

interface AboutTemplateProps {
  html: string;
  authorInfo: AuthorInfo;
}

export default function AboutTemplate({ html, authorInfo }: AboutTemplateProps) {
  return (
    <Layout>
      <AboutMetaTags authorInfo={authorInfo} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}
