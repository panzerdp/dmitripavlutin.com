import * as React from 'react';
import { shallow } from 'enzyme';

import NewsletterMetaTags from '../index';

describe('<NewsletterMetaTags />', function() {
  it('should render meta tags', function() {
    const wrapper = shallow(<NewsletterMetaTags />);
    expect(wrapper.contains(<title>Newsletter</title>)).toBe(true);
    expect(wrapper.contains(<meta name="description" content="Subscribe to newsletter" />)).toBe(true);
  });
});
