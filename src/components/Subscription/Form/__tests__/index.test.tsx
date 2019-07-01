import * as React from 'react';
import { shallow } from 'enzyme';

import SubscriptionForm from '../index';

const emailSubscriptionService = {
  endpoint: 'https://test.us13.list-manage.com/subscribe/post?u=xxxx&id=0000000',
  hiddenFieldName: 'b_xxxx_0000000',
};

const props = {
  emailSubscriptionService,
};

describe('<SubscriptionForm />', function() {
  it('should mention the keywords', function() {
    const wrapper = shallow(<SubscriptionForm {...props} />);
    const text = wrapper.text().toLowerCase();
    expect(text).toContain('inbox');
    expect(text).toContain('subscribe');
    expect(text).toContain('javascript');
    expect(text).toContain('newsletter');
  });

  it('should render submit form', function() {
    const wrapper = shallow(<SubscriptionForm {...props} />);
    const form = wrapper.find(`form[action="${emailSubscriptionService.endpoint}"]`).at(0);
    expect(form.exists()).toBe(true);
    expect(form.find('input[type="email"][name="EMAIL"]')).toHaveLength(1);
    expect(form.find('button[type="submit"]')).toHaveLength(1);
  });

  it('should render the hidden field', function() {
    const wrapper = shallow(<SubscriptionForm {...props} />);
    const form = wrapper.find(`form[action="${emailSubscriptionService.endpoint}"]`).at(0);
    expect(form.find(`input[type="text"][name="${emailSubscriptionService.hiddenFieldName}"]`)).toHaveLength(1);
  });
});
