import { shallow } from 'enzyme';

import Page404Template from '../index';
import Post404MetaTags from 'components/Pages/404/Meta/Tags';
import Layout from 'components/Layout/Fetch';

const props = {
  html: '<div>Some content</div>',
};

describe('<Page404Template />', function() {
  it('should render meta information', function() {
    const wrapper = shallow(<Page404Template {...props} />);
    expect(wrapper.find(Layout).contains(<Post404MetaTags />)).toBe(true);
  });

  it('should render posts list', () => {
    const wrapper = shallow(<Page404Template {...props} />);
    expect(wrapper.find(Layout).contains(<div dangerouslySetInnerHTML={{ __html: props.html }} />)).toBe(true);
  });
});
