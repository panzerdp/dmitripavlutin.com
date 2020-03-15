import * as React from 'react';
import { shallow } from 'enzyme';

import PostRightSidebar from '../index';
import CarbonAd from 'components/Carbon/Ad'
import CarbonAdsFetch from 'components/Carbon/Fetch';
import SubscriptionRegion from 'components/Subscription/Region';

const carbonAdsService: CarbonAdsService = {
  isEnabled: true,
  isProductionMode: true,
  scriptSrc: 'http://site.com/script.js',
};

const popularPosts = [
  {
    description: 'Useful techniques to facilitate React server-side rendering.',
    published: '2018-03-17',
    modified: '2019-01-01',
    commentsThreadId: 'thread-id',
    slug: 'useful-techniques-react-server-side-rendering',
    tags: ['react', 'server side rendering'],
    title: 'Useful techniques to facilitate React server-side rendering',
    thumbnail: {
      src: 'src',
      srcSet: 'src-set',
      width: 100,
      height: 100,
    },
  },
];

const props = {
  popularPosts,
  siteUrl: 'http://example.com',
};

describe('<PostRightSidebar />', function() {
  it('should render carbon ads', function() {
    const wrapper = shallow(<PostRightSidebar popularPosts={popularPosts} siteUrl="http://example.com" />)
      .find(CarbonAdsFetch)
      .renderProp('render')(carbonAdsService);
    expect(wrapper.find(<CarbonAd carbonAdsService={carbonAdsService} />));
  });

  it('should render subscription form', function() {
    const wrapper = shallow(<PostRightSidebar {...props} />);
    expect(wrapper.contains(<SubscriptionRegion />)).toBe(true);
  });
});
