import * as React from 'react';
import { shallow } from 'enzyme';
import { CommentCount } from 'gatsby-plugin-disqus';

import PostCommentsCount from '../index';

const props = {
  url: 'https://dmitripavlutin.com/my-post',
  title: 'My post',
  commentsTheadId: 'thread-id',
};

describe('<PostCommentsCount />', function() {
  it('should render disqus comments count', function() {
    const wrapper = shallow(<PostCommentsCount {...props} />);
    const disqusConfig = {
      url: props.url,
      title: props.title,
      identifier: props.commentsTheadId,
    };
    expect(wrapper.contains(<CommentCount config={disqusConfig} placeholder="... Comments" />)).toBe(true);
  });
});
