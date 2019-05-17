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
}

export default function ExcerptsTemplate({
  siteMetadata,
  posts,
  currentPage,
  pagesSum
  }: ExcerptsTemplateProps) {
  return (
    <Layout>
      <MetaTags {...this.props} />
      <MetaStructuredData {...this.props} />
      <MetaPaginator 
        currentPage={currentPage}
        pagesSum={pagesSum}
        siteUrl={siteMetadata.siteUrl} 
      />
      {posts.map((post, index) => <PostExcerptComponent post={post} key={index} />)}
      <Paginator
        currentPage={currentPage}
        pagesSum={pagesSum}
      />
    </Layout>
  );
}