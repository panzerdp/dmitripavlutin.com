import { shallow } from 'enzyme';

import PlainListAllMetaTags from '../index';

describe('<PlainListAllMetaTags />', function() {
  it('should render the title', function() {
    const wrapper = shallow(<PlainListAllMetaTags />);
    expect(wrapper.contains(<title>All posts</title>)).toBe(true);
  });

  it('should render meta description', () => {
    const wrapper = shallow(<PlainListAllMetaTags />);
    expect(wrapper.contains(<meta name="description" content="All posts" />)).toBe(true);
  });
});
