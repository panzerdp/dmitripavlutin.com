import * as React from 'react';
import { shallow } from 'enzyme';

import PlainListByTagTemplate from '../index';
import Layout from 'components/Layout/Fetch';
import SimpleList from 'components/Simple/List';
import PlainListByTagMetaTags from 'components/Pages/PlainListByTag/Meta/Tags';

const posts: PostPlain[] = [
  {
    description: 'Useful techniques to facilitate React server-side rendering.',
    published: '2018-03-17',
    slug: 'useful-techniques-react-server-side-rendering',
    tags: ['react', 'server side rendering'],
    title: 'Useful techniques to facilitate React server-side rendering',
  },
  {
    description: 'JavaScript arrow functions in details',
    published: '2018-03-17',
    slug: 'javascript-arrow-functions',
    tags: ['javascript', 'arrow function'],
    title: 'JavaScript arrow functions in details',
  },
];

const props = {
  tag: 'javascript',
  posts,
};

describe('<PlainListAllTemplate />', function() {
  it('should render meta information', function() {
    const wrapper = shallow(<PlainListByTagTemplate {...props} />);
    const layout = wrapper.find(Layout);
    expect(layout.contains(<PlainListByTagMetaTags tag={props.tag} />)).toBe(true);
  });

  it('should render posts list', () => {
    const wrapper = shallow(<PlainListByTagTemplate {...props} />);
    const layout = wrapper.find(Layout);
    expect(layout.contains(<SimpleList posts={posts} />)).toBe(true);
  });
});
