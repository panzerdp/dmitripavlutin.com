import * as React from 'react';
import { shallow } from 'enzyme';

import PostAboutAuthor from '../index';

const props = {
  authorInfo: {
    name: 'Dmitri Pavlutin',
    email: 'mail@mail.com',
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
  authorProfilePictureSrc: '/image.png',
};

describe('<PostAboutAuthor />', function() {
  it('should render author profile picture', function() {
    const wrapper = shallow(<PostAboutAuthor {...props} />);
    expect(wrapper.find(`img[src="${props.authorProfilePictureSrc}"]`)).toHaveLength(1);
  });

  it('should render author description', function() {
    const wrapper = shallow(<PostAboutAuthor {...props} />);
    expect(wrapper.text()).toContain(props.authorInfo.description);
  });
});
