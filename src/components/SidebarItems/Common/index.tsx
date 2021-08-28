import SubscriptionRegion from 'components/Subscription/Region';
import AboutAuthorDetailed from 'components/AboutAuthor/Detailed';
import AuthorCoaching from 'components/AboutAuthor/Coaching';
// import AuthorJobOpportunities from 'components/AboutAuthor/JobOpportunities';
import AboutAuthorFetch, { AboutAuthorFetchResult } from 'components/AboutAuthor/Fetch';
import JobOpportunities from 'components/AboutAuthor/JobOpportunities';

export default function SidebarItemsCommon() {
  return (
    <>
      <SubscriptionRegion />
      <AboutAuthorFetch render={renderAuthorInfo} />
      <JobOpportunities />
    </>
  );
}

function renderAuthorInfo({ authorInfo, authorProfilePictureBig }: AboutAuthorFetchResult): JSX.Element {
  return (
    <>
      <AboutAuthorDetailed authorInfo={authorInfo} authorProfilePicture={authorProfilePictureBig} />
      {/* <AuthorJobOpportunities authorInfo={authorInfo} /> */}
      <AuthorCoaching authorInfo={authorInfo} />
    </>
  );
}
