import * as React from 'react';

import Layout from 'components/Layout/Fetch';
import Excerpt from 'components/Pages/ExcerptsList/Excerpt';
import MetaPaginator from 'components/Pages/ExcerptsList/Meta/Paginator';
import MetaStructuredData from 'components/Pages/ExcerptsList/Meta/StructuredData';
import MetaTags from 'components/Pages/ExcerptsList/Meta/Tags';
import Paginator from 'components/Pages/ExcerptsList/Paginator';

interface ExcerptsTemplateProps {
  siteInfo: SiteInfo;
  posts: PostExcerpt[];
  currentPage: number;
  pagesSum: number;
  authorProfilePictureSrc: string;
}

export default function ExcerptsListTemplate({
  siteInfo,
  posts,
  currentPage,
  pagesSum,
  authorProfilePictureSrc,
}: ExcerptsTemplateProps) {
  return (
    <Layout>
      <MetaTags siteInfo={siteInfo} authorProfilePictureSrc={authorProfilePictureSrc} />
      <MetaStructuredData siteInfo={siteInfo} authorProfilePictureSrc={authorProfilePictureSrc} />
      <MetaPaginator currentPage={currentPage} pagesSum={pagesSum} siteUrl={siteInfo.url} />
      {posts.map((post, index) => (
        <Excerpt post={post} key={index} />
      ))}
      <Paginator currentPage={currentPage} pagesSum={pagesSum} />
    </Layout>
  );
}
