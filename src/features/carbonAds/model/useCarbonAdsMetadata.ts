import { useStaticQuery, graphql } from 'gatsby'
import { CarbonAdsQuery } from 'graphql-types'

export function useCarbonAdsMetadata() {
  const data = useStaticQuery<CarbonAdsQuery>(
    graphql`
    fragment CarbonAdsAll on SiteSiteMetadataCarbonAds {
      isEnabled
      isProductionMode
      scriptSrc
    }

    query CarbonAds {
      site {
        siteMetadata {
          carbonAds {
            ...CarbonAdsAll
          }
        }
      }
    }
    `
  )

  return data.site.siteMetadata.carbonAds
}