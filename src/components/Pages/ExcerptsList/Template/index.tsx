import * as React from 'react';

import Layout from 'components/Layout/Container';
import PostExcerptComponent from 'components/Pages/ExcerptsList/Excerpt';
import MetaPaginator from 'components/Pages/ExcerptsList/Meta/Paginator';
import MetaStructuredData from 'components/Pages/ExcerptsList/Meta/StructuredData';
import MetaTags from 'components/Pages/ExcerptsList/Meta/Tags';
import Paginator from 'components/Pages/ExcerptsList/Paginator';

interface ExcerptsTemplateProps {
  siteMetadata: SiteMetadata;
  posts: PostExcerpt[];
  currentPage: number;
  pagesSum: number;
  authorProfilePicture: FluidImage;
}

export default function ExcerptsTemplate({
  siteMetadata,
  posts,
  currentPage,
  pagesSum,
  authorProfilePicture,
}: ExcerptsTemplateProps) {
  return (
    <Layout>
      <MetaTags siteMetadata={siteMetadata} authorProfilePicture={authorProfilePicture} />
      <MetaStructuredData siteMetadata={siteMetadata} authorProfilePicture={authorProfilePicture} />
      <MetaPaginator currentPage={currentPage} pagesSum={pagesSum} siteUrl={siteMetadata.siteUrl} />
      {posts.map((post, index) => (
        <PostExcerptComponent post={post} key={index} />
      ))}
      <Paginator currentPage={currentPage} pagesSum={pagesSum} />
    </Layout>
  );
}
