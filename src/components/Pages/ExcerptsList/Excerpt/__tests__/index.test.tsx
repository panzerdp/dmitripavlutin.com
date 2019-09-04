import * as React from 'react';
import { shallow } from 'enzyme';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import Excerpt from 'components/Pages/ExcerptsList/Excerpt';
import { TO_POST } from 'routes/path';

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
  siteUrl: 'https://example.com',
};

describe('<Excerpt />', function() {
  it('should render the link to post', function() {
    const wrapper = shallow(<Excerpt {...props} />);
    const to = TO_POST({ slug: post.slug });
    expect(wrapper.contains(<Link to={to}>{post.title}</Link>)).toBe(true);
  });

  it('should render the post thumbnail', function() {
    const wrapper = shallow(<Excerpt {...props} />);
    expect(wrapper.contains(<Img sizes={post.thumbnail} />)).toBe(true);
  });

  it('should render the post description', function() {
    const wrapper = shallow(<Excerpt {...props} />);
    expect(wrapper.text()).toContain(post.description);
  });
});
