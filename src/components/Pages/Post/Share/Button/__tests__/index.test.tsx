import * as React from 'react';
import { shallow } from 'enzyme';

import PostShareButton from '../index';

describe('<PostShareButton />', function() {
  it('should render an anchor', function() {
    const wrapper = shallow(<PostShareButton />);
    expect(wrapper.find('a')).toHaveLength(1);
  });

  it('should pass props to anchor', function() {
    const child = <div>Child</div>;
    const wrapper = shallow(
      <PostShareButton className="someClass" href="http://dmitripavlutin.com/">
        {child}
      </PostShareButton>
    );
    expect(wrapper.find('a.someClass[href="http://dmitripavlutin.com/"]')).toHaveLength(1);
    expect(wrapper.contains(child)).toBe(true);
  });
});
