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

describe('<PostRightSidebar />', function() {
  it('should render carbon ads', function() {
    const wrapper = shallow(<PostRightSidebar />)
      .find(CarbonAdsFetch)
      .renderProp('render')(carbonAdsService);
    expect(wrapper.find(<CarbondAdsBanner carbonAdsService={carbonAdsService} />));
  });

  it('should render subscription form', function() {
    const wrapper = shallow(<PostRightSidebar />);
    expect(wrapper.contains(<SubscriptionRegion />)).toBe(true);
  });
});
