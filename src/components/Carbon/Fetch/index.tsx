
import { graphql, StaticQuery } from 'gatsby'

import { CarbonAdsQuery } from 'graphql-types'

interface CarbonAdsFetchProps {
  render(carbonAdsService: CarbonAdsService): React.ReactNode;
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
      render={(data: CarbonAdsQuery) => render(data.site.siteMetadata.carbonAdsService)}
    />
  )
}
