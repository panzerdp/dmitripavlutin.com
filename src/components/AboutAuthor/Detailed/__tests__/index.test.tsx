import * as React from 'react';
import { shallow } from 'enzyme';
import Img from 'gatsby-image';

import AboutAuthorDetailed from '../index';

const authorProfilePicture: FluidImage = {
  src: 'source',
  base64: 'base64',
  aspectRatio: 2,
  srcSet: 'src-set',
  sizes: 'some sizes',
  srcWebp: 'src-webp',
  srcSetWebp: 'src-set-webp',
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
    twitterFollowersCount: '1.1K',
  },
};

describe('<PostAboutAuthorDetailed />', function() {
  it('should render author profile picture', function() {
    const wrapper = shallow(<AboutAuthorDetailed {...props} />);
    expect(wrapper.contains(<Img fluid={authorProfilePicture} alt={props.authorInfo.name} />)).toBe(true);
  });

  it('should render author description', function() {
    const wrapper = shallow(<AboutAuthorDetailed {...props} />);
    expect(wrapper.text()).toContain(props.authorInfo.description);
  });
});
