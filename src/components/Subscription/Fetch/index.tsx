import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import { EmailSubscriptionQuery } from 'typings/graphql';

interface CarbonAdsFetchProps {
  render(emailSubscriptionService: EmailSubscriptionService, count: number): React.ReactNode;
}

/* istanbul ignore next */
export default function SubscriptionFetch({ render }: CarbonAdsFetchProps) {
  return (
    <StaticQuery
      query={graphql`
        query EmailSubscription {
          site {
            siteMetadata {
              emailSubscriptionService {
                endpoint
                hiddenFieldName
              }
            }
          }
          allMailchimpList {
            edges {
              node {
                stats {
                  member_count
                }
              }
            }
          }
        }
      `}
      render={(data: EmailSubscriptionQuery) => {
        return render(
          data.site.siteMetadata.emailSubscriptionService, 
          data.allMailchimpList.edges[0].node.stats.member_count
        );
      }}
    />
  );
}
