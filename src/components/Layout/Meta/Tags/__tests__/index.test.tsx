import * as React from 'react';
import { shallow } from 'enzyme';

import LayoutMetaTags from '../index';

const siteInfo: SiteInfo = {
  title: 'Dmitri Pavlutin',
  description: 'Thoughts on Frontend development',
  metaTitle: 'Dmitri Pavlutin Blog',
  metaDescription: 'Posts by Dmitri Pavlutin about software development',
  url: 'https://dmitripavlutin.com',
  repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
};

describe('<LayoutMetaTags />', function() {
  it('should render meta information', function() {
    const wrapper = shallow(<LayoutMetaTags siteInfo={siteInfo} />);
    expect(wrapper.contains(<title>{siteInfo.metaTitle}</title>));
    expect(wrapper.contains(<meta name="description" content={siteInfo.metaDescription} />));
  });

  it('should allow robots index', function() {
    const wrapper = shallow(<LayoutMetaTags siteInfo={siteInfo} />);
    expect(wrapper.contains(<meta name="robots" content="index, follow" />));
  });

  it('should set the site language', function() {
    const wrapper = shallow(<LayoutMetaTags siteInfo={siteInfo} />);
    expect(wrapper.contains(<html lang="en" />));
  });
});
