import { graphql } from 'gatsby';
import * as React from 'react';

import { NewsletterQuery } from 'typings/graphql';
import NewsletterTemplate from 'components/Pages/Newsletter/Template';

interface NewsletterFetchProps {
  data: NewsletterQuery;
}

export default function NewsletterFetch({ data }: NewsletterFetchProps) {
  return (
    <NewsletterTemplate
      siteInfo={data.site.siteMetadata.siteInfo}
      emailSubscriptionService={data.site.siteMetadata.emailSubscriptionService}
    />
  );
}

export const pageQuery = graphql`
  query Newsletter {
    site {
      siteMetadata {
        siteInfo {
          ...SiteInfoAll
        }
        emailSubscriptionService {
          endpoint
          hiddenFieldName
        }
      }
    }
  }
`;
