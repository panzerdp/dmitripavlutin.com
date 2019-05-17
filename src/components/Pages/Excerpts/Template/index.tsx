import React from 'react';

import PostExcerptComponent from 'components/Pages/Excerpts/PostExcerpt';
import Paginator from 'components/Pages/Excerpts/Paginator';
import MetaTags from 'components/Pages/Excerpts/Meta/Tags';
import MetaStructuredData from 'components/Pages/Excerpts/Meta/StructuredData';
import MetaPaginator from 'components/Pages/Excerpts/Meta/Paginator';
import Layout from 'components/Layout/Container';

interface ExcerptsTemplateProps {
  siteMetadata: SiteMetadata;
  posts: PostExcerpt[];
  currentPage: number;
  pagesSum: number;
  pathPrefix: string;
}

export default function ExcerptsTemplate({
  siteMetadata,
  posts,
  currentPage,
  pagesSum,
  pathPrefix
  }: ExcerptsTemplateProps) {
  return (
    <Layout>
      {/* <MetaTags {...this.props} />
      <MetaStructuredData {...this.props} /> */}
      <MetaPaginator 
        currentPage={currentPage}
        pagesSum={pagesSum}
        pathPrefix={pathPrefix}
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