import * as React from 'react';

import Layout from 'components/Layout/Fetch';
import SearchRightSidebar from 'components/Pages/Search/Sidebar/Right';
import SearchMetaTags from 'components/Pages/Search/Meta/Tags';

import styles from './index.module.scss';

interface SearchTemplateProps {
  googleCustomSearchId: string;
}

export default function SearchTemplate({ googleCustomSearchId }: SearchTemplateProps): JSX.Element {
  return (
    <Layout rightSidebar={<SearchRightSidebar />}>
      <SearchMetaTags googleCustomSearchId={googleCustomSearchId} />
      <div className={styles.search}>
        <div className="gcse-search"></div>  
      </div>
    </Layout>
  );
}