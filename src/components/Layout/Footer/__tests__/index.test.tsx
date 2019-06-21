import * as React from 'react';
import { shallow } from 'enzyme';

import LayoutFooter from '../index';
import { TO_ABOUT_ME, TO_ALL_POSTS, TO_INDEX } from 'routes/path';

const authorInfo: AuthorInfo = {
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
    twitter: 'panzerdp',
  },
};

describe('<LayoutFooter />', function() {
  it('should render author name', function() {
    const wrapper = shallow(<LayoutFooter authorInfo={authorInfo} />);
    expect(wrapper.text()).toContain(authorInfo.name);
  });

  it('should render navigation links', function() {
    const wrapper = shallow(<LayoutFooter authorInfo={authorInfo} />);
    expect(wrapper.find({ to: TO_INDEX() })).toHaveLength(1);
    expect(wrapper.find({ to: TO_ABOUT_ME() })).toHaveLength(1);
    expect(wrapper.find({ to: TO_ALL_POSTS() })).toHaveLength(1);
  });

  it('should render author profiles', function() {
    const wrapper = shallow(<LayoutFooter authorInfo={authorInfo} />);
    const { profiles } = authorInfo;
    [profiles.twitter, profiles.github, profiles.stackoverflow, profiles.linkedin].forEach((url) =>
      expect(wrapper.find(`a[href="${url}"]`)).toHaveLength(1)
    );
  });

  it('should render license information', function() {
    const wrapper = shallow(<LayoutFooter authorInfo={authorInfo} />);
    expect(wrapper.text()).toContain('Licensed under CC BY 4.0');
  });
});
