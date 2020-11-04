import SubscriptionRegion from 'components/Subscription/Region';
import AboutAuthorDetailed from 'components/AboutAuthor/Detailed';
import AboutAuthorContact from 'components/AboutAuthor/Contact';
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
      <AboutAuthorContact authorInfo={authorInfo} />
    </>
  );
}
