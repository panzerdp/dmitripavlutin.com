import * as React from 'react';
import { shallow } from 'enzyme';

import ExcerptsListRightSidebar from '../index';
import SidebarItemsCommon from 'components/SidebarItems/Common';

describe('<ExcerptsListRightSidebar />', function() {
  it('should render sidebar items', function() {
    const wrapper = shallow(<ExcerptsListRightSidebar />);
    expect(wrapper.contains(<SidebarItemsCommon />)).toBeTruthy();
  });
});
