/* eslint-disable react/jsx-key */
import { shallow } from 'enzyme';

import MetaTags from '../index';

const siteInfo: SiteInfo = {
  title: 'Dmitri Pavlutin',
  description: 'Thoughts on Frontend development',
  metaTitle: 'Dmitri Pavlutin Blog',
  metaDescription: 'Posts by Dmitri Pavlutin about software development',
  url: 'https://dmitripavlutin.com',
  repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
};

describe('<ExcerptsListMetaTags />', function() {
  it('should render meta tags for first page', function() {
    const wrapper = shallow(<MetaTags currentPage={1} siteInfo={siteInfo} authorProfilePictureSrc="/image.png" />);
    expect(wrapper.contains(<title>{siteInfo.metaTitle}</title>)).toBe(true);
    expect(wrapper.contains(<meta name="description" content={siteInfo.metaDescription} />)).toBe(true);
  });

  it('should render meta tags for second page', function() {
    const wrapper = shallow(<MetaTags currentPage={2} siteInfo={siteInfo} authorProfilePictureSrc="/image.png" />);
    expect(wrapper.contains(<title>{siteInfo.metaTitle}, page 2</title>)).toBe(true);
    expect(wrapper.contains(<meta name="description" content={`${siteInfo.metaDescription}, page 2`} />)).toBe(true);
  });

  it('should render open graph tags', function() {
    const wrapper = shallow(<MetaTags currentPage={1} siteInfo={siteInfo} authorProfilePictureSrc="/image.png" />);
    [
      <meta property="og:site_name" content={siteInfo.metaTitle} />,
      <meta property="og:type" content="website" />,
      <meta property="og:title" content={siteInfo.metaTitle} />,
      <meta property="og:description" content={siteInfo.metaDescription} />,
      <meta property="og:url" content={siteInfo.url} />,
      <meta property="og:image" content={`${siteInfo.url}/image.png`} />,
      <meta property="og:image:width" content="256" />,
      <meta property="og:image:height" content="256" />,
    ].forEach((item) => expect(wrapper.contains(item)).toBe(true));
  });

  it('should render twitter card tags', () => {
    const wrapper = shallow(<MetaTags currentPage={1} siteInfo={siteInfo} authorProfilePictureSrc="/image.png" />);
    [
      <meta name="twitter:card" content="summary" />,
      <meta name="twitter:title" content={siteInfo.metaTitle} />,
      <meta name="twitter:description" content={siteInfo.metaDescription} />,
      <meta name="twitter:url" content={siteInfo.url} />,
      <meta name="twitter:image" content={`${siteInfo.url}/image.png`} />,
    ].forEach((item) => expect(wrapper.contains(item)).toBe(true));
  });
});
