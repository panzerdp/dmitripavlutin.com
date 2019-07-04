import * as React from 'react';
import { shallow } from 'enzyme';

import PostRightSidebar from '../index';
import CarbondAdsBanner from 'components/CarbonAds/Banner';
import CarbonAdsFetch from 'components/CarbonAds/Fetch';
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
    slug: 'useful-techniques-react-server-side-rendering',
    tags: ['react', 'server side rendering'],
    title: 'Useful techniques to facilitate React server-side rendering',
  },
];

describe('<PostRightSidebar />', function() {
  it('should render carbon ads', function() {
    const wrapper = shallow(<PostRightSidebar popularPosts={popularPosts} />)
      .find(CarbonAdsFetch)
      .renderProp('render')(carbonAdsService);
    expect(wrapper.find(<CarbondAdsBanner carbonAdsService={carbonAdsService} />));
  });

  it('should render subscription form', function() {
    const wrapper = shallow(<PostRightSidebar popularPosts={popularPosts} />);
    expect(wrapper.contains(<SubscriptionRegion />)).toBe(true);
  });
});
