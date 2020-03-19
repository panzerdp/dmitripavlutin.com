import * as React from 'react';
import { useFlexSearch } from 'react-use-flexsearch';

import Layout from 'components/Layout/Fetch';

interface SearchTemplateProps {
  index: string;
  store: string;
}

export default function SearchTemplate({ index, store }: SearchTemplateProps): JSX.Element {
  const results = useFlexSearch('Swift', index, store);
  console.log(index);
  return (
    <Layout>
      <div>Search results</div>
    </Layout>
  );
}