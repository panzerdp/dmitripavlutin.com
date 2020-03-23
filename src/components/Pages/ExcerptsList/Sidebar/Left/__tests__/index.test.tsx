import * as React from 'react';
import { shallow } from 'enzyme';

import ExcerptsListLeftSidebar from '../index';
import CardonSection from 'components/Carbon/Section';

describe('<ExcerptsListLeftSidebar />', function () {
  it('should render carbon', function () {
    const wrapper = shallow(<ExcerptsListLeftSidebar />);
    expect(
      wrapper.contains(
        <CardonSection />
      )
    ).toBe(true);
  });
});
