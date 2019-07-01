import * as React from 'react';
import { shallow } from 'enzyme';

import NewsletterTemplate from '../index';
import SubscriptionRegion from 'components/Subscription/Region';
import MetaTags from 'components/Pages/Newsletter/Meta/Tags';

describe('<NewsletterTemplate />', function() {
  it('should render the title', function() {
    const wrapper = shallow(<NewsletterTemplate />);
    expect(wrapper.contains(<h1>Newsletter</h1>)).toBe(true);
  });

  it('should render meta tags', function() {
    const wrapper = shallow(<NewsletterTemplate />);
    expect(wrapper.contains(<MetaTags />)).toBe(true);
  });

  it('should render subscription form', function() {
    const wrapper = shallow(<NewsletterTemplate />);
    expect(wrapper.contains(<SubscriptionRegion />)).toBe(true);
  });
});
