import * as React from 'react';
import { shallow } from 'enzyme';

import PostShareGroupHorizontal from '../index';
import ShareSocialFacebook from 'components/Pages/Post/Share/Social/Facebook';
import ShareSocialReddit from 'components/Pages/Post/Share/Social/Reddit';
import PostShareSocialTwitter from 'components/Pages/Post/Share/Social/Twitter';

const props = {
  url: 'http://site.com/post-id',
  text: 'Some share text',
  tags: ['javascript', 'string', 'length'],
};

describe('<PostShareGroupHorizontal />', function() {
  it('should render facebook share button', function() {
    const wrapper = shallow(<PostShareGroupHorizontal {...props} />);
    expect(wrapper.contains(<ShareSocialFacebook {...props} />)).toBe(true);
  });

  it('should render reddit share button', function() {
    const wrapper = shallow(<PostShareGroupHorizontal {...props} />);
    expect(wrapper.contains(<ShareSocialReddit {...props} />)).toBe(true);
  });

  it('should render twitter share button', function() {
    const wrapper = shallow(<PostShareGroupHorizontal {...props} />);
    expect(wrapper.contains(<PostShareSocialTwitter {...props} />)).toBe(true);
  });
});
