import * as React from 'react';
import { shallow } from 'enzyme';

import LayoutMetaTags from '../index';

const siteMetadata: SiteMetadata = {
  title: 'Dmitri Pavlutin blog',
  description: 'Posts by Dmitri Pavlutin about software development',
  speciality: 'Software developer',
  siteUrl: 'https://dmitripavlutin.com',
  repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
  author: 'Dmitri Pavlutin',
  profiles: {
    stackoverflow: 'https://stackoverflow.com/users/1894471/dmitri-pavlutin',
    twitter: 'https://twitter.com/panzerdp',
    linkedin: 'https://www.linkedin.com/in/dmitri-pavlutin/',
    github: 'https://github.com/panzerdp',
    facebook: 'https://www.facebook.com/dmitri.pavlutin',
  },
  nicknames: {
    twitter: '@panzerdp',
  },
};

describe('<LayoutMetaTags />', function() {
  it('should render meta information', function() {
    const wrapper = shallow(<LayoutMetaTags siteMetadata={siteMetadata} />);
    expect(wrapper.contains(<title>{siteMetadata.title}</title>));
    expect(wrapper.contains(<meta name="description" content={siteMetadata.description} />));
  });
});
