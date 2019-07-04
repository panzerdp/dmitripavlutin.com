import * as React from 'react';

import Layout from 'components/Layout/Fetch';
import SimpleList from 'components/Simple/List';
import MetaTags from '../Meta/Tags';

interface PlainListAllTemplateProps {
  posts: PostPlain[];
}

export default function PlainListAllTemplate({ posts }: PlainListAllTemplateProps) {
  return (
    <Layout>
      <MetaTags />
      <h1>All posts</h1>
      <SimpleList posts={posts} />
    </Layout>
  );
}
