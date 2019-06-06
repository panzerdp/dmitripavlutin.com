import * as React from 'react';
import { shallow } from 'enzyme';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import PostRecommendedExcerpt from '../index';
import { TO_POST } from 'routes/path';

const post: PostExcerpt = {
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
};

const props = {
  post,
};

describe('<PostRecommendedExcerpt />', function() {
  it('should render the link to post', function() {
    const wrapper = shallow(<PostRecommendedExcerpt {...props} />);
    const to = TO_POST({ slug: post.slug });
    expect(wrapper.contains(<Link to={to}>{post.title}</Link>)).toBe(true);
  });

  it('should render the post thumbnail', function() {
    const wrapper = shallow(<PostRecommendedExcerpt {...props} />);
    expect(wrapper.contains(<Img sizes={post.thumbnail} />)).toBe(true);
  });
});
