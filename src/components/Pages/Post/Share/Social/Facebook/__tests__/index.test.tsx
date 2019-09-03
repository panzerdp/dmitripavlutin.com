import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { PostShareSocialFacebook, URL_SHARE_FACEBOOK } from '../index';
import PostShareButton from 'components/Pages/Post/Share/Button';

const props = {
  url: 'http://dmitripavlutin.com/some-javascript-post',
  windowOpen() {
    // window open
  },
};

describe('<PostShareSocialFacebook />', function() {
  it('should render share button', function() {
    const wrapper = shallow(<PostShareSocialFacebook {...props} />);
    expect(wrapper.find(PostShareButton)).toHaveLength(1);
  });

  it('should open facebook share window when clicked', function() {
    const windowOpen = jest.fn();
    const wrapper = mount(<PostShareSocialFacebook {...props} windowOpen={windowOpen} />);
    expect(windowOpen).not.toHaveBeenCalled();
    wrapper.find('a').simulate('click');
    expect(windowOpen).toHaveBeenCalled();
    const argument = windowOpen.mock.calls[0][0];
    expect(argument).toHaveProperty('url', `${URL_SHARE_FACEBOOK}?u=${encodeURIComponent(props.url)}`);
  });
});
