import * as React from 'react';
import { shallow } from 'enzyme';

import PostEdit from '../index';

const props = {
  url: 'http://repo.com/post-file.md',
};

describe('<PostEdit />', function() {
  it('should render post edit link', function() {
    const wrapper = shallow(<PostEdit {...props} />);
    expect(wrapper.find(`a[href="${props.url}"]`)).toHaveLength(1);
  });
});
