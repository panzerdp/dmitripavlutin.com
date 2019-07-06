import * as React from 'react';
import { shallow } from 'enzyme';
import Link from 'gatsby-link';

import PopularPosts from '../index';
import { TO_POST } from 'routes/path';

const posts: PostPlain[] = [
  {
    description: 'Useful techniques to facilitate React server-side rendering.',
    published: '2018-03-17',
    slug: 'useful-techniques-react-server-side-rendering',
    tags: ['react', 'arrow function', 'arrow', 'javascript', 'server'],
    title: 'Useful techniques to facilitate React server-side rendering',
  },
  {
    description: 'JavaScript arrow functions in details',
    published: '2018-03-17',
    slug: 'javascript-arrow-functions',
    tags: ['arrow function', 'react', 'function', 'javascript'],
    title: 'JavaScript arrow functions in details',
  },
];

describe('<PopularPosts />', function() {
  it('should render popular posts', function() {
    const wrapper = shallow(<PopularPosts posts={posts} />);
    posts.forEach((post) => {
      expect(wrapper.contains(<Link to={TO_POST({ slug: post.slug })}>{post.title}</Link>)).toBe(true);
    });
    expect(wrapper.find(Link)).toHaveLength(posts.length);
  });
});
