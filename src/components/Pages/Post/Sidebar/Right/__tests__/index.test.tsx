import * as React from 'react';
import { shallow } from 'enzyme';

import PostRightSidebar from '../index';

describe('<PostRightSidebar />', function() {
  it('should render its children', function() {
    const child = <div>Child</div>;
    const wrapper = shallow(<PostRightSidebar>{child}</PostRightSidebar>);
    expect(wrapper.contains(child)).toBe(true);
  });
});
