import * as React from 'react';
import { shallow } from 'enzyme';
import Img from 'gatsby-image';

import AboutAuthorConcise from '../index';

const authorProfilePicture: FixedImage = {
  width: 100,
  height: 100,
  base64: 'base64-encoded-string',
  src: '/image.png',
  srcSet: 'some srcset values',
};

const props = {
  authorInfo: {
    name: 'Dmitri Pavlutin',
    email: 'mail@mail.com',
    jobTitle: 'Software Developer',
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
  },
  authorProfilePicture,
  authorStats: {
    twitterFollowersCount: '1.1K'
  }
};

describe('<PostAboutAuthorConcise />', function() {
  it('should render author profile picture', function() {
    const wrapper = shallow(<AboutAuthorConcise {...props} />);
    expect(wrapper.contains(<Img fixed={authorProfilePicture} alt={props.authorInfo.name} />)).toBe(true);
  });

  it('should render author description', function() {
    const wrapper = shallow(<AboutAuthorConcise {...props} />);
    expect(wrapper.text()).toContain(props.authorInfo.description);
  });
});
