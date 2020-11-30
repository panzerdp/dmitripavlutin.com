import SubscriptionRegion from 'components/Subscription/Region';
import AboutAuthorDetailed from 'components/AboutAuthor/Detailed';
import AuthorCoaching from 'components/AboutAuthor/Coaching';
import AuthorJobOpportunities from 'components/AboutAuthor/JobOpportunities';
import AboutAuthorFetch, { AboutAuthorFetchResult } from 'components/AboutAuthor/Fetch';

export default function SidebarItemsCommon() {
  return (
    <>
      <SubscriptionRegion />
      <AboutAuthorFetch render={renderAuthorInfo} />
    </>
  );
}

function renderAuthorInfo({ authorInfo, authorProfilePictureBig, authorStats }: AboutAuthorFetchResult): JSX.Element {
  return (
    <>
      <AboutAuthorDetailed authorInfo={authorInfo} authorProfilePicture={authorProfilePictureBig}  authorStats={authorStats} />
      <AuthorJobOpportunities authorInfo={authorInfo} />
      <AuthorCoaching authorInfo={authorInfo} />
    </>
  );
}
