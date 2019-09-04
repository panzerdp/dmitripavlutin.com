import * as React from 'react';
import { shallow } from 'enzyme';

import SimpleList from '../index';

const props = {
  posts: [
    {
      title: 'Post 1',
      description: 'Description',
      slug: 'post-1',
      tags: ['tag1', 'tag2'],
      published: '2019-01-01',
      modified: '2019-01-01',
      commentsThreadId: 'thread-id',
    },
    {
      title: 'Post 2',
      description: 'Description',
      slug: 'post-2',
      tags: ['tag1', 'tag4'],
      published: '2019-01-01',
      modified: '2019-01-01',
      commentsThreadId: 'thread-id',
    },
  ],
};

describe('<SimpleList />', function() {
  it('should render a list of posts', function() {
    const wrapper = shallow(<SimpleList {...props} />);
    props.posts.forEach((post) => {
      expect(wrapper.find({ post }).is('SimplePost')).toBe(true);
    });
  });

  it('should render insert elements before post', function() {
    function beforeEachPost(post: PostPlain): React.ReactNode {
      return <div className="inserted">{post.title}</div>;
    }
    const wrapper = shallow(<SimpleList {...props} beforeEachPost={beforeEachPost} />);
    expect(wrapper.find('.inserted+SimplePost')).toHaveLength(2);
  });
});
