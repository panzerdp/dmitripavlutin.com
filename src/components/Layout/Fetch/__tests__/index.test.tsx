import * as React from 'react';
import { shallow } from 'enzyme';

import { LayoutFetch } from '../index';

const siteInfo = {
  title: 'Dmitri Pavlutin blog',
  description: 'Posts by Dmitri Pavlutin about software development',
  url: 'https://dmitripavlutin.com',
  repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
};

const authorInfo = {
  name: 'Dmitri Pavlutin',
  description: 'Dmitri Pavlutin is a software developer specialized in Frontend technologies',
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

const authorProfilePicture = {
  width: 100,
  height: 100,
  base64: 'base64-encoded-string',
  src: 'http://images.com/image',
  srcSet: 'some srcset values',
};

const props = {
  data: {
    site: {
      siteMetadata: {
        siteInfo,
        authorInfo,
      },
    },
    file: {
      childImageSharp: {
        resolutions: authorProfilePicture,
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
