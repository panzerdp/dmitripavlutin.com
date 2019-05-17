import React from 'react';

import TagMetaTags from '../Meta/Tags';
import Layout from 'components/Layout/Container';
import SimpleList from 'components/Pages/Common/Simple/List';

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