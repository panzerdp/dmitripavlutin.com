import SubscriptionRegion from 'components/Subscription/Region';
import AboutAuthorDetailed from 'components/AboutAuthor/Detailed';
// import AuthorCoaching from 'components/AboutAuthor/Coaching';
// import AuthorJobOpportunities from 'components/AboutAuthor/JobOpportunities';
import JobOpportunities from 'components/AboutAuthor/JobOpportunities';

export default function SidebarItemsCommon() {
  return (
    <>
      <SubscriptionRegion />
      <AboutAuthorDetailed />
      {/* <AuthorJobOpportunities /> */}
      {/* <AuthorCoaching /> */}
      <JobOpportunities />
    </>
  );
}