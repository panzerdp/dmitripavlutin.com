import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import { CarbonAdsQuery } from 'typings/graphql';

interface CarbonAdsFetchProps {
  render({ carbonAdsService }: { carbonAdsService: CarbonAdsService }): React.ReactNode;
}

/* istanbul ignore next */
export default function CarbonAdsFetch({ render }: CarbonAdsFetchProps) {
  return (
    <StaticQuery
      query={graphql`
        query CarbonAds {
          site {
            siteMetadata {
              carbonAdsService {
                ...CarbonAdsServiceAll
              }
            }
          }
        }
      `}
      render={(data: CarbonAdsQuery) => render({ carbonAdsService: data.site.siteMetadata.carbonAdsService })}
    />
  );
}
