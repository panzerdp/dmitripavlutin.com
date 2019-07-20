import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import { AuthorStatsQuery } from 'typings/graphql';

interface TwitterFetchProps {
  render(result: { authorStats: AuthorStats; authorInfo: AuthorInfo }): React.ReactNode;
}

/* istanbul ignore next */
export default function TwitterFetch({ render }: TwitterFetchProps) {
  return (
    <StaticQuery
      query={graphql`
        query AuthorStats {
          site {
            siteMetadata {
              authorStats {
                ...AuthorStatsAll
              }
              authorInfo {
                ...AuthorInfoAll
              }
            }
          }
        }
      `}
      render={(data: AuthorStatsQuery) => {
        return render({
          authorStats: data.site.siteMetadata.authorStats,
          authorInfo: data.site.siteMetadata.authorInfo,
        });
      }}
    />
  );
}
