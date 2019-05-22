import * as React from 'react';
import { shallow } from 'enzyme';

import LayoutContainer from '../index';
import LayoutFooter from 'components/Layout/Footer';
import LayoutHeader from 'components/Layout/Header';
import LayoutMetaTags from 'components/Layout/Meta/Tags';

const siteInfo: SiteInfo = {
  title: 'Dmitri Pavlutin blog',
  description: 'Posts by Dmitri Pavlutin about software development',
  url: 'https://dmitripavlutin.com',
  repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
};

const authorInfo: AuthorInfo = {
  name: 'Dmitri Pavlutin',
  speciality: 'Software developer',
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

const profilePicture: FixedImage = {
  width: 100,
  height: 100,
  src: 'http://images.com/image',
  srcSet: 'some srcset values',
};

describe('<LayoutMetaTags />', function() {
  it('should render its children', function() {
    const child = <div>I am a child</div>;
    const wrapper = shallow(
      <LayoutContainer siteInfo={siteInfo} authorInfo={authorInfo} profilePicture={profilePicture}>
        {child}
      </LayoutContainer>
    );
    expect(wrapper.contains(child));
  });

  it('should render meta tags', function() {
    const wrapper = shallow(
      <LayoutContainer siteInfo={siteInfo} authorInfo={authorInfo} profilePicture={profilePicture}>
        Child
      </LayoutContainer>
    );
    expect(wrapper.contains(<LayoutMetaTags siteInfo={siteInfo} />));
  });

  it('should render header', function() {
    const wrapper = shallow(
      <LayoutContainer siteInfo={siteInfo} authorInfo={authorInfo} profilePicture={profilePicture}>
        Child
      </LayoutContainer>
    );
    expect(wrapper.contains(<LayoutHeader profilePicture={profilePicture} authorInfo={authorInfo} />));
  });

  it('should render footer', function() {
    const wrapper = shallow(
      <LayoutContainer siteInfo={siteInfo} authorInfo={authorInfo} profilePicture={profilePicture}>
        Child
      </LayoutContainer>
    );
    expect(wrapper.contains(<LayoutFooter authorInfo={authorInfo} />));
  });
});
