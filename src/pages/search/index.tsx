import { graphql } from 'gatsby';
import * as React from 'react';

import SearchTemplate from 'components/Pages/Search/Template';
import { SearchQuery } from 'typings/graphql';

interface SearchFetchProps {
  data: SearchQuery;
}

export default function SearchFetch({ data }: SearchFetchProps) {
  return <SearchTemplate googleCustomSearchId={data.site.siteMetadata.googleCustomSearchId} />;
}

export const pageQuery = graphql`
  query Search {
    site {
      siteMetadata {
        googleCustomSearchId 
      }
    }
  }
`;
