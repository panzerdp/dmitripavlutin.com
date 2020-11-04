import Layout from 'components/Layout/Fetch';
import SimpleList from 'components/Simple/List';
import PlainListByTagMetaTags from '../Meta/Tags';

interface PlainListByTagTemplateProps {
  tag: string;
  posts: PostPlain[];
}

export default function PlainListByTagTemplate({ tag, posts }: PlainListByTagTemplateProps) {
  return (
    <Layout>
      <PlainListByTagMetaTags tag={tag} />
      <h1>&quot;{tag}&quot; posts</h1>
      <SimpleList posts={posts} />
    </Layout>
  );
}
