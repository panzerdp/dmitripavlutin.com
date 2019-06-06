import * as React from 'react';
import { shallow } from 'enzyme';

import PostShareBottom from '../index';
import ShareGroupHorizontal from 'components/Pages/Post/Share/Group/Horizontal';

const props = {
  url: 'http://site.com/post-id',
  text: 'Some share text',
  tags: ['javascript', 'string', 'length'],
};

describe('<PostShareBottom />', function() {
  it('should render vertical share buttons', function() {
    const wrapper = shallow(<PostShareBottom {...props} />);
    expect(wrapper.contains(<ShareGroupHorizontal {...props} />)).toBe(true);
  });
});
