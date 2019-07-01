import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import { EmailSubscriptionServiceQuery } from 'typings/graphql';

interface CarbonAdsFetchProps {
  render(emailSubscriptionService: EmailSubscriptionService): React.ReactNode;
}

/* istanbul ignore next */
export default function SubscriptionFetch({ render }: CarbonAdsFetchProps) {
  return (
    <StaticQuery
      query={graphql`
        query EmailSubscriptionService {
          site {
            siteMetadata {
              emailSubscriptionService {
                endpoint
                hiddenFieldName
              }
            }
          }
        }
      `}
      render={(data: EmailSubscriptionServiceQuery) => render(data.site.siteMetadata.emailSubscriptionService)}
    />
  );
}
