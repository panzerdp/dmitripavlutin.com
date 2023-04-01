import SubscriptionFetch from 'components/Subscription/Fetch'
import { SubscriptionForm } from 'components/Subscription/Form'

export default function SubscriptionRegion() {
  return <SubscriptionFetch render={renderSubscriptionForm} />
}

function renderSubscriptionForm(emailSubscriptionService: EmailSubscriptionService) {
  return <SubscriptionForm emailSubscriptionService={emailSubscriptionService} />
}
