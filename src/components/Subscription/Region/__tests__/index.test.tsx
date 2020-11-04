import { shallow } from 'enzyme';

import SubscriptionRegion from '../index';
import SubscriptionForm from 'components/Subscription/Form';

const emailSubscriptionService = {
  endpoint: 'https://test.us13.list-manage.com/subscribe/post?u=xxxx&id=0000000',
  hiddenFieldName: 'b_xxxx_0000000',
};

describe('<SubscriptionRegion />', function() {
  it('should render subscription form', function() {
    const wrapper = shallow(<SubscriptionRegion />);
    const form = wrapper.renderProp('render')(emailSubscriptionService);
    expect(form.contains(<SubscriptionForm emailSubscriptionService={emailSubscriptionService} />)).toBe(true);
  });
});
