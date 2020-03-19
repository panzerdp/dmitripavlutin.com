import { graphql } from 'gatsby';
import * as React from 'react';

import SearchTemplate from 'components/Pages/Search/Template';
import { SearchQuery } from 'typings/graphql';

interface SearchFetchProps {
  data: SearchQuery;
}

export default function SearchFetch({
  data: {
    localSearchPages: {
      index,
      store
    }
  }
}: SearchFetchProps) {
  return <SearchTemplate index={index} store={store} />;
}

export const pageQuery = graphql`
  query Search {
    localSearchPages {
      index
      store
    }
  }
`;
