import * as React from 'react';
import { shallow } from 'enzyme';

import { TwitterFollowButton } from '../index';

const props = {
  twitterFollowersCount: "2.5K",
  username: "panzerdp",
  authorName: "Dmitri Pavlutin",
  windowOpen() {}
}

describe('<AboutAuthorTwitterFollowButton />', function() {
  it('should render username and followers count', function() {
    const wrapper = shallow(<TwitterFollowButton {...props} />);
    expect(wrapper.text()).toContain(`Follow @${props.username}`);
    expect(wrapper.text()).toContain(`${props.twitterFollowersCount} followers`);
  });

  it('should open follow window when clicked', function() {
    const windowOpen = jest.fn();
    const wrapper = shallow(<TwitterFollowButton {...props} windowOpen={windowOpen} />);
    expect(windowOpen).not.toBeCalled();
    wrapper.find('#follow-button').simulate('click', {
      preventDefault() {}
    });
    expect(windowOpen).toBeCalled();
  });
});
