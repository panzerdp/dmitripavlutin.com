import * as React from 'react';
import { shallow } from 'enzyme';

import SearchRightSidebar from '../index';
import SidebarItemsCommon from 'components/SidebarItems/Common';

describe('<SearchRightSidebar />', function() {
  it('should render common sidebar items', function() {
    const wrapper = shallow(<SearchRightSidebar />);
    expect(wrapper.contains(<SidebarItemsCommon />)).toBe(true);
  });
});
