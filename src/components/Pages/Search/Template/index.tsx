import * as React from 'react';

import Layout from 'components/Layout/Fetch';
import SearchRightSidebar from 'components/Pages/Search/Sidebar/Right';
import SearchMetaTags from 'components/Pages/Search/Meta/Tags';
import ClientOnly from '../ClientOnly';

import styles from './index.module.scss';

interface SearchTemplateProps {
  googleCustomSearchId: string;
}

export default function SearchTemplate({ googleCustomSearchId }: SearchTemplateProps) {
  return (
    <Layout rightSidebar={<SearchRightSidebar />}>
      <div className={styles.search}>
        <h1>
          Search blog posts
        </h1>
        {/* Render google search only after mounting to prevent removing dynamically injected HTML */}
        <ClientOnly>
          <div className="gcse-search"></div>
        </ClientOnly>
      </div>
      <SearchMetaTags googleCustomSearchId={googleCustomSearchId} />
    </Layout>
  );
}