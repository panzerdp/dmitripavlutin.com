import { graphql, StaticQuery } from 'gatsby';

import { SiteInfoQuery } from 'graphql-types';

export interface AuthorInfoFetchProps {
  siteInfo: SiteInfo;
}

interface AboutAuthorFetchProps {
  render(result: AuthorInfoFetchProps): React.ReactNode;
}

export function FetchSiteInfo({ render }: AboutAuthorFetchProps) {
  return (
    <StaticQuery
      query={graphql`
        query SiteInfo {
          site {
            siteMetadata {
              siteInfo {
                ...SiteInfoAll
              }
            }
          }
        }
      `}
      render={(data: SiteInfoQuery) => render({ siteInfo: data.site.siteMetadata.siteInfo })}
    />
  );
}
