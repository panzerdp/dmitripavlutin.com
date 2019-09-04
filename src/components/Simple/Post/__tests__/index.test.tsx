import * as React from 'react';
import { shallow } from 'enzyme';

import SimplePost from '../index';
import { TO_POST } from 'routes/path';
import Subheader from 'components/Subheader/Simple';

const post: PostExcerpt = {
  title: 'Post 1',
  description: 'Description',
  slug: 'post-1',
  tags: ['tag1', 'tag2'],
  published: '2019-01-01',
  modified: '2019-01-01',
  commentsThreadId: 'thread-id',
  thumbnail: {
    aspectRatio: 1,
    src: 'src',
    srcSet: 'src-set',
    sizes: 'sizes',
  },
};

const props = {
  post,
};

describe('<SimplePost />', function() {
  it('should render a link to post', function() {
    const wrapper = shallow(<SimplePost {...props} />);
    expect(wrapper.find({ to: TO_POST({ slug: post.slug }) }).text()).toBe(post.title);
  });

  it('should render the subheader', function() {
    const wrapper = shallow(<SimplePost {...props} />);
    expect(wrapper.contains(<Subheader post={post} />)).toBe(true);
  });
});
