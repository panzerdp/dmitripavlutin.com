import * as React from 'react';
import { shallow } from 'enzyme';

import PostRightSidebar from '../index';
import SubscriptionRegion from 'components/Subscription/Region';

const popularPosts = [
  {
    description: 'Useful techniques to facilitate React server-side rendering.',
    published: '2018-03-17',
    slug: 'useful-techniques-react-server-side-rendering',
    tags: ['react', 'server side rendering'],
    title: 'Useful techniques to facilitate React server-side rendering',
  },
];

describe('<PostRightSidebar />', function() {
  it('should render subscription form', function() {
    const wrapper = shallow(<PostRightSidebar popularPosts={popularPosts} />);
    expect(wrapper.contains(<SubscriptionRegion />)).toBe(true);
  });
});
