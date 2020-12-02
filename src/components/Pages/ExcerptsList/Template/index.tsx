import Layout from 'components/Layout/Fetch';
import Excerpt from 'components/Pages/ExcerptsList/Excerpt';
import MetaPaginator from 'components/Pages/ExcerptsList/Meta/Paginator';
import MetaStructuredData from 'components/Pages/ExcerptsList/Meta/StructuredData';
import MetaTags from 'components/Pages/ExcerptsList/Meta/Tags';
import Paginator from 'components/Pages/ExcerptsList/Paginator';
import RightSidebar from 'components/Pages/ExcerptsList/Sidebar/Right';
import LeftSidebar from 'components/Pages/ExcerptsList/Sidebar/Left';
import PopularPostsPinned from 'components/Popular/PostsPinned';

interface ExcerptsTemplateProps {
  siteInfo: SiteInfo;
  posts: Post[];
  currentPage: number;
  pagesSum: number;
  authorProfilePictureSrc: string;
  popularPostsByCategory: {
    plainPosts: PostPlain[],
    category: string
  }[];
}

export default function ExcerptsListTemplate({
  siteInfo,
  posts,
  currentPage,
  pagesSum,
  authorProfilePictureSrc,
  popularPostsByCategory
}: ExcerptsTemplateProps) {
  console.log(popularPostsByCategory);
  return (
    <Layout rightSidebar={<RightSidebar />} leftSidebar={<LeftSidebar />}>
      <MetaTags siteInfo={siteInfo} authorProfilePictureSrc={authorProfilePictureSrc} currentPage={currentPage} />
      <MetaStructuredData siteInfo={siteInfo} authorProfilePictureSrc={authorProfilePictureSrc} />
      <MetaPaginator currentPage={currentPage} pagesSum={pagesSum} siteUrl={siteInfo.url} />
      <PopularPostsPinned popularPostsByCategory={popularPostsByCategory} />
      {posts.map((post, index) => (
        <Excerpt post={post} siteUrl={siteInfo.url} key={index} />
      ))}
      <Paginator currentPage={currentPage} pagesSum={pagesSum} />
    </Layout>
  );
}
