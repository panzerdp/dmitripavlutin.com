import Layout from 'components/Layout/Fetch';
import Excerpt from 'components/Pages/ExcerptsList/Excerpt';
import { ExcerptsListMetaPaginator } from 'components/Pages/ExcerptsList/Meta/Paginator';
import { ExcerptsListMetaStructuredData } from 'components/Pages/ExcerptsList/Meta/StructuredData';
import { ExcerptsListMetaTags } from 'components/Pages/ExcerptsList/Meta/Tags';
import Paginator from 'components/Pages/ExcerptsList/Paginator';
import RightSidebar from 'components/Pages/ExcerptsList/Sidebar/Right';
import LeftSidebar from 'components/Pages/ExcerptsList/Sidebar/Left';
import PopularPostsPinned from 'components/Popular/PostsPinned';
import { Post } from 'typings/post';

interface ExcerptsTemplateProps {
  posts: Post[];
  currentPage: number;
  pagesSum: number;
  popularPostsByCategory: {
    plainPosts: Post[],
    category: string
  }[];
}

export default function ExcerptsListTemplate({
  posts,
  currentPage,
  pagesSum,
  popularPostsByCategory
}: ExcerptsTemplateProps) {
  return (
    <Layout rightSidebar={<RightSidebar />} leftSidebar={<LeftSidebar />}>
      <ExcerptsListMetaTags currentPage={currentPage} />
      <ExcerptsListMetaStructuredData />
      <ExcerptsListMetaPaginator currentPage={currentPage} pagesSum={pagesSum} />
      <PopularPostsPinned popularPostsByCategory={popularPostsByCategory} />
      {posts.map(post => <Excerpt post={post} key={post.slug} />)}
      <Paginator currentPage={currentPage} pagesSum={pagesSum} />
    </Layout>
  );
}
