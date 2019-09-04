import * as React from 'react';
import { shallow } from 'enzyme';

import PostRecommendedList from '../index';
import PostRecommendedExcerpt from 'components/Pages/Post/Recommended/Excerpt';

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
      thumbnail: {
        aspectRatio: 1,
        src: 'src',
        srcSet: 'src-set',
        sizes: 'sizes',
      },
    },
    {
      title: 'Post 2',
      description: 'Description',
      slug: 'post-2',
      tags: ['tag1', 'tag4'],
      published: '2019-01-01',
      modified: '2019-01-01',
      commentsThreadId: 'thread-id',
      thumbnail: {
        aspectRatio: 2,
        src: 'src',
        srcSet: 'src-set',
        sizes: 'sizes',
      },
    },
  ],
};

describe('<PostRecommendedList />', function() {
  it('should render a list of excerpts', function() {
    const wrapper = shallow(<PostRecommendedList {...props} />);
    props.posts.forEach((post) => {
      expect(wrapper.contains(<PostRecommendedExcerpt post={post} />)).toBe(true);
    });
  });
});
