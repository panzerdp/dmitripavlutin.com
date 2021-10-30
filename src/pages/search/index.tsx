import { graphql } from 'gatsby';

import SearchTemplate from 'components/Pages/Search/Template';
import { SearchQuery } from 'graphql-types';

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
