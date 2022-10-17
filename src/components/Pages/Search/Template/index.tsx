import Layout from 'components/Layout/Fetch';
import SearchMetaTags from 'components/Pages/Search/SearchMetaTags';
import ClientOnly from '../ClientOnly';

import * as styles from './index.module.scss';

export default function SearchTemplate() {
  return (
    <Layout>
      <div className={styles.search}>
        <h1>
          Search blog posts
        </h1>
        {/* Render google search only after mounting to prevent removing dynamically injected HTML */}
        <ClientOnly>
          <div className="gcse-search"></div>
        </ClientOnly>
      </div>
      <SearchMetaTags />
    </Layout>
  );
}