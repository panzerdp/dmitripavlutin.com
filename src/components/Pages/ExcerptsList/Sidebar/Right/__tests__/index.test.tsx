import * as React from 'react';
import { shallow } from 'enzyme';

import ExcerptsListRightSidebar from '../index';
import AboutAuthorFetch from 'components/AboutAuthor/Fetch';

describe('<PostRightSidebar />', function() {
  it('should render subscription form', function() {
    const wrapper = shallow(<ExcerptsListRightSidebar />);
    expect(wrapper.find(AboutAuthorFetch)).toHaveLength(1);
  });
});
