import * as React from 'react';
import { mount } from 'enzyme';

import CarbonAdsBanner from '../index';

const props = {
  carbonAdsService: {
    scriptSrc: 'http://example.com/script.js',
    isEnabled: true,
    isProductionMode: true,
  },
  className: '',
};

describe('<CarbonAdsBanner />', function() {
  it('should render carbon script in production mode', function() {
    const wrapper = mount(<CarbonAdsBanner {...props} />);
    expect(wrapper.html()).toContain('<script src="http://example.com/script.js" id="_carbonads_js"></script>');
  });

  it('should render carbon dev message in development mode', function() {
    const wrapper = mount(
      <CarbonAdsBanner
        carbonAdsService={{
          ...props.carbonAdsService,
          isProductionMode: false,
        }}
      />
    );
    expect(wrapper.html()).not.toContain('<script src="http://example.com/script.js" id="_carbonads_js"></script>');
  });

  it('should render null when disabled', function() {
    const wrapper = mount(
      <CarbonAdsBanner
        carbonAdsService={{
          ...props.carbonAdsService,
          isEnabled: false,
        }}
      />
    );
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
