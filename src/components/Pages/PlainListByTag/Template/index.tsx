import React from 'react';

import Layout from 'components/Layout/Container';
import SimpleList from 'components/Pages/Common/Simple/List';
import TagMetaTags from '../Meta/Tags';

interface PlainListByTagTemplateProps {
  tag: string;
  posts: PostExcerpt[];
}

export default function PlainListByTagTemplate({ tag, posts }: PlainListByTagTemplateProps) {
  return (
    <Layout>
      <TagMetaTags tag={tag} />
      <h1>&quot;{tag}&quot; posts</h1>
      <SimpleList posts={posts} />
    </Layout>
  );
}
