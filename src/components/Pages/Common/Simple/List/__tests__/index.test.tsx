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
      thumbnail: {
        aspectRatio: 2,
        src: 'src',
        srcSet: 'src-set',
        sizes: 'sizes',
      },
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
});
