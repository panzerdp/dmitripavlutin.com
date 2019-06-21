import * as React from 'react';
import { shallow } from 'enzyme';

import AboutTemplate from '../index';
import AboutMetaTags from 'components/Pages/About/Meta/Tags';
import Layout from 'components/Layout/Fetch';

const authorInfo: AuthorInfo = {
  name: 'Dmitri Pavlutin',
  nicknames: {
    twitter: 'panzerdp',
  },
  profiles: {
    facebook: 'https://www.facebook.com/dmitri.pavlutin',
    github: 'https://github.com/panzerdp',
    linkedin: 'https://www.linkedin.com/in/dmitri-pavlutin/',
    stackoverflow: 'https://stackoverflow.com/users/1894471/dmitri-pavlutin',
    twitter: 'https://twitter.com/panzerdp',
  },
  description: 'Dmitri Pavlutin is a software developer specialized in Frontend technologies',
};

const props = {
  html: '<div>Some content</div>',
  authorInfo,
};

describe('<AboutTemplate />', function() {
  it('should render meta information', function() {
    const wrapper = shallow(<AboutTemplate {...props} />);
    expect(wrapper.find(Layout).contains(<AboutMetaTags authorInfo={authorInfo} />)).toBe(true);
  });

  it('should render posts list', () => {
    const wrapper = shallow(<AboutTemplate {...props} />);
    expect(wrapper.find(Layout).contains(<div dangerouslySetInnerHTML={{ __html: props.html }} />)).toBe(true);
  });
});
