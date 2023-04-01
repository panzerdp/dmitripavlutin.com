import { graphql, StaticQuery } from 'gatsby'

import { EmailSubscriptionQuery } from 'graphql-types'

interface SubscriptionFetchProps {
  render(emailSubscriptionService: EmailSubscriptionService): React.ReactNode;
}

/* istanbul ignore next */
export default function SubscriptionFetch({ render }: SubscriptionFetchProps) {
  return (
    <StaticQuery
      query={graphql`
        query EmailSubscription {
          site {
            siteMetadata {
              emailSubscriptionService {
                endpoint
              }
            }
          }
        }
      `}
      render={(data: EmailSubscriptionQuery) => {
        return render(data.site.siteMetadata.emailSubscriptionService)
      }}
    />
  )
}
