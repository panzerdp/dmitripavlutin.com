import * as React from 'react';

import Layout from 'components/Layout/Container';
import SimpleList from 'components/Pages/Common/Simple/List';
import AllPostsMetaTags from '../Meta/Tags';

interface PlainListAllTemplateProps {
  posts: PostExcerpt[];
}

export default function PlainListAllTemplate({ posts }: PlainListAllTemplateProps) {
  return (
    <Layout>
      <AllPostsMetaTags />
      <h1>All posts</h1>
      <SimpleList posts={posts} />
    </Layout>
  );
}
