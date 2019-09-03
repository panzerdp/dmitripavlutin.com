import * as React from 'react';
import { shallow } from 'enzyme';

import Subheader from 'components/Subheader';
import { formatDate } from 'utils/date';

const props = {
  tags: ['tag1', 'tag2'],
  published: '2019-01-01',
};

describe('<Subheader />', function() {
  it('should render post published date', function() {
    const wrapper = shallow(<Subheader {...props} />);
    expect(wrapper.text()).toContain(formatDate(props.published));
  });

  it('should render post tags', function() {
    const wrapper = shallow(<Subheader {...props} />);
    props.tags.forEach((tag) => {
      expect(wrapper.find({ tag }).is('Tag')).toBe(true);
    });
  });
});
