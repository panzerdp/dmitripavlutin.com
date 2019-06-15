import * as React from 'react';
import Img from 'gatsby-image';
import { shallow } from 'enzyme';

import LayoutHeader from '../index';
import { TO_ABOUT, TO_ALL_POSTS, TO_INDEX } from 'routes/path';

const authorInfo: AuthorInfo = {
  name: 'Dmitri Pavlutin',
  speciality: 'Software developer',
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

const authorProfilePicture: FixedImage = {
  width: 100,
  height: 100,
  base64: 'base64-encoded-string',
  src: 'http://images.com/image',
  srcSet: 'some srcset values',
};

const props = {
  authorInfo,
  authorProfilePicture,
};

describe('<LayoutHeader />', function() {
  it('should render author name', function() {
    const wrapper = shallow(<LayoutHeader {...props} />);
    expect(wrapper.text()).toContain(authorInfo.name);
  });

  it('should render navigation links', function() {
    const wrapper = shallow(<LayoutHeader {...props} />);
    [{ to: TO_INDEX() }, { to: TO_ABOUT() }, { to: TO_ALL_POSTS() }].forEach((linkProps) =>
      expect(wrapper.find(linkProps).length).toBeGreaterThanOrEqual(1)
    );
  });

  it('should render profile picture', function() {
    const wrapper = shallow(<LayoutHeader {...props} />);
    expect(wrapper.find({ resolutions: authorProfilePicture }).is(Img)).toBe(true);
  });
});
