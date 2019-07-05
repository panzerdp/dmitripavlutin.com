import * as React from 'react';
import { shallow } from 'enzyme';

import Tag from 'components/Tag';
import { TO_TAG } from 'routes/path';

const props = {
  tag: 'JavaScript Language',
};

describe('<Tag />', function() {
  it('should render tag name', function() {
    const wrapper = shallow(<Tag {...props} />);
    expect(wrapper.text()).toContain(props.tag);
  });

  it('should render tag link', function() {
    const wrapper = shallow(<Tag {...props} />);
    expect(wrapper.find({ to: TO_TAG({ slug: 'javascript-language' }) })).toHaveLength(1);
  });
});
