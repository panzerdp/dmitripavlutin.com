import { shallow } from 'enzyme';

import PostShareSocialReddit, { URL_SHARE_REDDIT } from '../index';
import PostShareButton from 'components/Pages/Post/Share/Button';

const props = {
  url: 'http://dmitripavlutin.com/some-javascript-post',
  text: 'How to determine string length',
};

describe('<PostShareSocialFacebook />', function() {
  it('should render share button', function() {
    const wrapper = shallow(<PostShareSocialReddit {...props} />);
    expect(wrapper.find(PostShareButton).prop('href')).toBe(
      `${URL_SHARE_REDDIT}?url=${encodeURIComponent(props.url)}&title=${encodeURIComponent(props.text)}`
    );
  });
});
