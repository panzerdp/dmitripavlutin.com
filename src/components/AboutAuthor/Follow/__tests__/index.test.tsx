import * as React from 'react';
import { shallow } from 'enzyme';

import AboutAuthorFollow from '../index';
import TwitterFollowButton from 'components/AboutAuthor/TwitterFollowButton';

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
  authorStats: {
    twitterFollowersCount: '1.1K',
  },
};

describe('<PostAboutAuthorFollow />', function() {
  it('should render follow button', function() {
    const wrapper = shallow(<AboutAuthorFollow {...props} />);
    expect(
      wrapper.contains(
        <TwitterFollowButton
          authorName={props.authorInfo.name}
          twitterFollowersCount={props.authorStats.twitterFollowersCount}
          username={props.authorInfo.nicknames.twitter}
        />
      )
    ).toBe(true);
  });
});
