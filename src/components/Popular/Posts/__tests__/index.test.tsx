import * as React from 'react';
import { shallow } from 'enzyme';
import Link from 'gatsby-link';

import PopularPosts from '../index';
import { TO_POST } from 'routes/path';

const posts: Post<FixedImage>[] = [
  {
    description: 'Useful techniques to facilitate React server-side rendering.',
    published: '2018-03-17',
    modified: '2019-01-01',
    commentsThreadId: 'thread-id',
    slug: 'useful-techniques-react-server-side-rendering',
    tags: ['react', 'arrow function', 'arrow', 'javascript', 'server'],
    title: 'Useful techniques to facilitate React server-side rendering',
    thumbnail: {
      src: 'src',
      srcSet: 'src-set',
      width: 100,
      height: 100,
    },
  },
  {
    description: 'JavaScript arrow functions in details',
    published: '2018-03-17',
    modified: '2019-01-01',
    commentsThreadId: 'thread-id',
    slug: 'javascript-arrow-functions',
    tags: ['arrow function', 'react', 'function', 'javascript'],
    title: 'JavaScript arrow functions in details',
    thumbnail: {
      src: 'src',
      srcSet: 'src-set',
      width: 100,
      height: 100,
    },
  },
];

const props = {
  posts,
  siteUrl: 'http://example.com',
};

describe('<PopularPosts />', function() {
  it('should render popular posts', function() {
    const wrapper = shallow(<PopularPosts {...props} />);
    posts.forEach((post) => {
      expect(
        wrapper.contains(
          <Link to={TO_POST({ slug: post.slug })} className="link">
            {post.title}
          </Link>
        )
      ).toBe(true);
    });
  });
});
