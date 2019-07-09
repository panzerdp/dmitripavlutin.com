import * as React from 'react';
import { shallow } from 'enzyme';

import { LayoutFetch } from '../index';

const siteInfo: SiteInfo = {
  title: 'Dmitri Pavlutin',
  description: 'Thoughts on Frontend development',
  metaTitle: 'Dmitri Pavlutin Blog',
  metaDescription: 'Posts by Dmitri Pavlutin about software development',
  url: 'https://dmitripavlutin.com',
  repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
};

const authorInfo: AuthorInfo = {
  name: 'Dmitri Pavlutin',
  description: 'Dmitri Pavlutin is a software developer specialized in Frontend technologies',
  email: 'mail@mail.com',
  jobTitle: 'Software developer',
  profiles: {
    stackoverflow: 'https://stackoverflow.com/users/1894471/dmitri-pavlutin',
    twitter: 'https://twitter.com/panzerdp',
    linkedin: 'https://www.linkedin.com/in/dmitri-pavlutin/',
    github: 'https://github.com/panzerdp',
    facebook: 'https://www.facebook.com/dmitri.pavlutin',
  },
  nicknames: {
    twitter: 'panzerdp',
  },
};

const carbonAdsService = {
  scriptSrc: 'http://example.com/script.js',
  isProductionMode: true,
  isEnabled: true,
};

const authorProfilePicture = {
  width: 100,
  height: 100,
  base64: 'base64-encoded-string',
  src: 'http://images.com/image',
  srcSet: 'some srcset values',
  srcSetWebp: 'src-set-webp',
  srcWebp: 'src-webp',
};

const props = {
  data: {
    site: {
      siteMetadata: {
        siteInfo,
        authorInfo,
        carbonAdsService,
      },
    },
    file: {
      childImageSharp: {
        fixed: authorProfilePicture,
      },
    },
  },
};

describe('<LayoutFetch />', function() {
  it('should render its children', function() {
    const child = <div>Child</div>;
    const wrapper = shallow(<LayoutFetch {...props}>{child}</LayoutFetch>);
    expect(wrapper.contains(child));
  });

  it('should render the layout container', function() {
    const wrapper = shallow(<LayoutFetch {...props}>Child</LayoutFetch>);
    expect(wrapper).toMatchSnapshot();
  });
});
