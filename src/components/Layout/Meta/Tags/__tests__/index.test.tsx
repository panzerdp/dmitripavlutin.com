import * as React from 'react';
import { shallow } from 'enzyme';

import LayoutMetaTags from '../index';

const siteInfo: SiteInfo = {
  title: 'Dmitri Pavlutin blog',
  description: 'Posts by Dmitri Pavlutin about software development',
  url: 'https://dmitripavlutin.com',
  repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
};

describe('<LayoutMetaTags />', function() {
  it('should render meta information', function() {
    const wrapper = shallow(<LayoutMetaTags siteInfo={siteInfo} />);
    expect(wrapper.contains(<title>{siteInfo.title}</title>));
    expect(wrapper.contains(<meta name="description" content={siteInfo.description} />));
  });
});
