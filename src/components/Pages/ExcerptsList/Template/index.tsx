import * as React from 'react';

import Layout from 'components/Layout/Fetch';
import PostExcerptComponent from 'components/Pages/ExcerptsList/Excerpt';
import MetaPaginator from 'components/Pages/ExcerptsList/Meta/Paginator';
import MetaStructuredData from 'components/Pages/ExcerptsList/Meta/StructuredData';
import MetaTags from 'components/Pages/ExcerptsList/Meta/Tags';
import Paginator from 'components/Pages/ExcerptsList/Paginator';

interface ExcerptsTemplateProps {
  siteInfo: SiteInfo;
  posts: PostExcerpt[];
  currentPage: number;
  pagesSum: number;
  authorProfilePicture: FluidImage;
}

export default function ExcerptsTemplate({
  siteInfo,
  posts,
  currentPage,
  pagesSum,
  authorProfilePicture,
}: ExcerptsTemplateProps) {
  return (
    <Layout>
      <MetaTags siteInfo={siteInfo} authorProfilePicture={authorProfilePicture} />
      <MetaStructuredData siteInfo={siteInfo} authorProfilePicture={authorProfilePicture} />
      <MetaPaginator currentPage={currentPage} pagesSum={pagesSum} siteUrl={siteInfo.url} />
      {posts.map((post, index) => (
        <PostExcerptComponent post={post} key={index} />
      ))}
      <Paginator currentPage={currentPage} pagesSum={pagesSum} />
    </Layout>
  );
}
