import React from 'react';

import PostExcerptComponent from 'components/Pages/ExcerptsList/Excerpt';
import Paginator from 'components/Pages/ExcerptsList/Paginator';
import MetaTags from 'components/Pages/ExcerptsList/Meta/Tags';
import MetaStructuredData from 'components/Pages/ExcerptsList/Meta/StructuredData';
import MetaPaginator from 'components/Pages/ExcerptsList/Meta/Paginator';
import Layout from 'components/Layout/Container';

interface ExcerptsTemplateProps {
  siteMetadata: SiteMetadata;
  posts: PostExcerpt[];
  currentPage: number;
  pagesSum: number;
  pathPrefix: string;
  authorProfilePicture: FluidImage
}

export default function ExcerptsTemplate({
  siteMetadata,
  posts,
  currentPage,
  pagesSum,
  pathPrefix,
  authorProfilePicture
  }: ExcerptsTemplateProps) {
  return (
    <Layout>
      <MetaTags
        siteMetadata={siteMetadata}
        authorProfilePicture={authorProfilePicture}
      />
      <MetaStructuredData
        siteMetadata={siteMetadata}
        authorProfilePicture={authorProfilePicture}
      />
      <MetaPaginator 
        currentPage={currentPage}
        pagesSum={pagesSum}
        siteUrl={siteMetadata.siteUrl} 
      />
      {posts.map((post, index) => <PostExcerptComponent post={post} key={index} />)}
      <Paginator
        currentPage={currentPage}
        pagesSum={pagesSum}
        pathPrefix={pathPrefix}
      />
    </Layout>
  );
}