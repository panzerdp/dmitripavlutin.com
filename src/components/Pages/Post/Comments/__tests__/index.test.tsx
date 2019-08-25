import * as React from 'react';
import { shallow } from 'enzyme';
import Disqus from 'gatsby-plugin-disqus';

import PostComments from '../index';

const props = {
  url: 'https://dmitripavlutin.com/my-post',
  title: 'My post',
  commentsTheadId: 'thread-id',
};

describe('<PostComments />', function() {
  it('should render disqus comments', function() {
    const wrapper = shallow(<PostComments {...props} />);
    expect(wrapper.contains(<Disqus url={props.url} title={props.title} identifier={props.commentsTheadId} />)).toBe(
      true
    );
  });
});
