import * as React from 'react';
import Layout from 'components/Layout/Fetch';

interface Page404TemplateProps {
  html: string;
}

export default function Page404Template({ html }: Page404TemplateProps) {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}