/* eslint-disable react/jsx-key */
import * as React from 'react';
import { shallow } from 'enzyme';

import MetaTags from '../index';

const siteInfo: SiteInfo = {
  title: 'Dmitri Pavlutin blog',
  description: 'Posts by Dmitri Pavlutin about software development',
  url: 'https://dmitripavlutin.com',
  repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
};

describe('<ExcerptsListMetaTags />', function() {
  it('should render open graph tags', function() {
    const wrapper = shallow(<MetaTags siteInfo={siteInfo} authorProfilePictureSrc="/image.png" />);
    [
      <meta property="og:site_name" content={siteInfo.title} />,
      <meta property="og:type" content="website" />,
      <meta property="og:title" content={siteInfo.title} />,
      <meta property="og:description" content={siteInfo.description} />,
      <meta property="og:url" content={siteInfo.url} />,
      <meta property="og:image" content={`${siteInfo.url}/image.png`} />,
      <meta property="og:image:width" content="256" />,
      <meta property="og:image:height" content="256" />,
    ].forEach((item) => expect(wrapper.contains(item)).toBe(true));
  });

  it('should render twitter card tags', () => {
    const wrapper = shallow(<MetaTags siteInfo={siteInfo} authorProfilePictureSrc="/image.png" />);
    [
      <meta name="twitter:card" content="summary" />,
      <meta name="twitter:title" content={siteInfo.title} />,
      <meta name="twitter:description" content={siteInfo.description} />,
      <meta name="twitter:url" content={siteInfo.url} />,
      <meta name="twitter:image" content={`${siteInfo.url}/image.png`} />,
    ].forEach((item) => expect(wrapper.contains(item)).toBe(true));
  });
});
