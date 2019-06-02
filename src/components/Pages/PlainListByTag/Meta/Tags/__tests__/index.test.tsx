import * as React from 'react';
import { shallow } from 'enzyme';

import PlainListByTagMetaTags from '../index';

describe('<PlainListByTagMetaTags />', function() {
  it('should render the title', function() {
    const wrapper = shallow(<PlainListByTagMetaTags tag="javascript" />);
    expect(wrapper.contains(<title>Javascript posts</title>)).toBe(true);
  });

  it('should render meta description', () => {
    const wrapper = shallow(<PlainListByTagMetaTags tag="javascript" />);
    expect(wrapper.contains(<meta name="description" content="Javascript posts" />)).toBe(true);
  });
});
