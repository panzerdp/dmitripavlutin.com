import { useStaticQuery, graphql } from 'gatsby'
import { CarbonAdsQuery } from 'graphql-types'

export function useCarbonAdsMetadata() {
  const data = useStaticQuery<CarbonAdsQuery>(
    graphql`
    fragment CarbonAdsServiceAll on SiteSiteMetadataCarbonAdsService {
      isEnabled
      isProductionMode
      scriptSrc
    }

    query CarbonAds {
      site {
        siteMetadata {
          carbonAdsService {
            ...CarbonAdsServiceAll
          }
        }
      }
    }
    `
  )

  return data.site.siteMetadata.carbonAdsService
}