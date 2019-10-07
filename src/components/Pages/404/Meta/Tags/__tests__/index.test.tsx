import * as React from 'react';
import { shallow } from 'enzyme';
import { Helmet } from 'react-helmet';

import Page404MetaTags from '../index';

describe('<Page404MetaTags />', function() {
  it('should render the title', function() {
    const wrapper = shallow(<Page404MetaTags />);
    expect(wrapper.find(Helmet).contains(<title>Page not found</title>)).toBe(true);
  });
});
