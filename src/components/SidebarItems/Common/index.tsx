import * as React from 'react';
import Media from 'react-media';

import SubscriptionRegion from 'components/Subscription/Region';
import AboutAuthorDetailed from 'components/AboutAuthor/Detailed';
import AboutAuthorContact from 'components/AboutAuthor/Contact';
import AboutAuthorFollow from 'components/AboutAuthor/Follow';
import AboutAuthorFetch, { AboutAuthorFetchResult } from 'components/AboutAuthor/Fetch';
import CarbonFetch from 'components/Carbon/Fetch';
import CarbonSection from 'components/Carbon/Section';
import CarbonAd from 'components/Carbon/Ad';

export default function SidebarItemsCommon() {
  return (
    <>
      <SubscriptionRegion />
      <Media query="(min-width: 1081px)" defaultMatches={false}>
        <CarbonSection>
          <CarbonFetch render={renderCarbon} />
        </CarbonSection>
      </Media>
      <AboutAuthorFetch render={renderAuthorInfo} />
    </>
  );
}

function renderCarbon(service: CarbonAdsService): JSX.Element {
  return <CarbonAd carbonAdsService={service} />;
}

function renderAuthorInfo({ authorInfo, authorProfilePictureBig, authorStats }: AboutAuthorFetchResult): JSX.Element {
  return (
    <>
      <AboutAuthorDetailed authorInfo={authorInfo} authorProfilePicture={authorProfilePictureBig} />
      <AboutAuthorFollow authorInfo={authorInfo} authorStats={authorStats} />
      <AboutAuthorContact authorInfo={authorInfo} />
    </>
  );
}
