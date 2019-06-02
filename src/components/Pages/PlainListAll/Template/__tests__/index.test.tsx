import * as React from 'react';
import { shallow } from 'enzyme';

import PlainListAllTemplate from '../index';
import Layout from 'components/Layout/Fetch';
import SimpleList from 'components/Pages/Common/Simple/List';
import PlainListAllMetaTags from 'components/Pages/PlainListAll/Meta/Tags';

const posts: PostExcerpt[] = [
  {
    description: 'Useful techniques to facilitate React server-side rendering.',
    published: '2018-03-17',
    slug: 'useful-techniques-react-server-side-rendering',
    tags: ['react', 'server side rendering'],
    thumbnail: {
      aspectRatio: 2,
      base64: 'base64',
      sizes: 'some sizes',
      src: 'source',
      srcSet: 'src-set',
    },
    title: 'Useful techniques to facilitate React server-side rendering',
  },
  {
    description: 'JavaScript arrow functions in details',
    published: '2018-03-17',
    slug: 'javascript-arrow-functions',
    tags: ['javascript', 'arrow function'],
    thumbnail: {
      aspectRatio: 2,
      base64: 'base64',
      sizes: 'some sizes',
      src: 'source',
      srcSet: 'src-set',
    },
    title: 'JavaScript arrow functions in details',
  },
];

describe('<PlainListAllTemplate />', function() {
  it('should render meta information', function() {
    const wrapper = shallow(<PlainListAllTemplate posts={posts} />);
    expect(wrapper.contains(<PlainListAllMetaTags />)).toBe(true);
  });

  it('should render posts list', () => {
    const wrapper = shallow(<PlainListAllTemplate posts={posts} />);
    const layout = wrapper.find(Layout);
    expect(layout.contains(<SimpleList posts={posts} />)).toBe(true);
  });
});
