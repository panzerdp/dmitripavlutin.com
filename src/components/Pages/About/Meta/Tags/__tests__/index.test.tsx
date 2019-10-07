import * as React from 'react';
import { shallow } from 'enzyme';
import { Helmet } from 'react-helmet';

import AboutMetaTags from '../index';

const authorInfo: AuthorInfo = {
  name: 'Dmitri Pavlutin',
  email: 'mail@mail.com',
  jobTitle: 'Software developer',
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

describe('<AboutMetaTags />', function() {
  it('should render the title', function() {
    const wrapper = shallow(<AboutMetaTags authorInfo={authorInfo} />);
    expect(wrapper.find(Helmet).contains(<title>About {authorInfo.name}</title>)).toBe(true);
  });
});
