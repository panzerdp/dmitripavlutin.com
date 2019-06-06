import * as React from 'react';
import { shallow } from 'enzyme';

import PostShareGroupVertical from '../index';
import ShareSocialFacebook from 'components/Pages/Post/Share/Social/Facebook';
import ShareSocialReddit from 'components/Pages/Post/Share/Social/Reddit';
import PostShareSocialTwitter from 'components/Pages/Post/Share/Social/Twitter';

const props = {
  url: 'http://site.com/post-id',
  text: 'Some share text',
  tags: ['javascript', 'string', 'length'],
};

const groupProps = {
  ...props,
  className: 'some-class',
};

describe('<PostShareGroupVertical />', function() {
  it('should set class name', function() {
    const wrapper = shallow(<PostShareGroupVertical {...groupProps} />);
    expect(wrapper.find('.some-class')).toHaveLength(1);
  });

  it('should render facebook share button', function() {
    const wrapper = shallow(<PostShareGroupVertical {...groupProps} />);
    expect(wrapper.contains(<ShareSocialFacebook {...props} />)).toBe(true);
  });

  it('should render reddit share button', function() {
    const wrapper = shallow(<PostShareGroupVertical {...groupProps} />);
    expect(wrapper.contains(<ShareSocialReddit {...props} />)).toBe(true);
  });

  it('should render twitter share button', function() {
    const wrapper = shallow(<PostShareGroupVertical {...groupProps} />);
    expect(wrapper.contains(<PostShareSocialTwitter {...props} />)).toBe(true);
  });
});
