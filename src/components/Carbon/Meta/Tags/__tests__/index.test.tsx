import { shallow } from 'enzyme';

import CarbonAdsMetaTags from '../index';

const carbonAdsService = {
  scriptSrc: 'http://example.com/script.js',
  isEnabled: true,
  isProductionMode: true,
};

describe('<CarbonAdsMetaTags />', function() {
  it('should render prefetch and preconnect meta tags', function() {
    const wrapper = shallow(<CarbonAdsMetaTags carbonAdsService={carbonAdsService} />);
    expect(wrapper.contains(<link rel="prefetch" href={carbonAdsService.scriptSrc} />)).toBe(true);
    expect(wrapper.contains(<link rel="preconnect" href="//cdn4.buysellads.net" />)).toBe(true);
  });

  it('should render null when not enabled', function() {
    const wrapper = shallow(
      <CarbonAdsMetaTags
        carbonAdsService={{
          ...carbonAdsService,
          isEnabled: false,
        }}
      />
    );
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should render null when not in prod mode', function() {
    const wrapper = shallow(
      <CarbonAdsMetaTags
        carbonAdsService={{
          ...carbonAdsService,
          isProductionMode: false,
        }}
      />
    );
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should render null when not enabled and not in prod mode', function() {
    const wrapper = shallow(
      <CarbonAdsMetaTags
        carbonAdsService={{
          ...carbonAdsService,
          isEnabled: false,
          isProductionMode: false,
        }}
      />
    );
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
