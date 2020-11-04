import { shallow } from 'enzyme';

import MetaPaginator from '../index';
import { TO_PAGE } from 'routes/path';

const props = {
  siteUrl: 'http://dmitripavlutin.com',
};

describe('<ExcerptsListMetaPaginator />', function() {
  it('should render prev and next pages', function() {
    const wrapper = shallow(<MetaPaginator {...props} currentPage={2} pagesSum={4} />);
    expect(wrapper.contains(<link rel="prev" href={props.siteUrl} />)).toBe(true);
    expect(wrapper.contains(<link rel="next" href={`${props.siteUrl}${TO_PAGE({ page: 3 })}`} />)).toBe(true);
    wrapper.setProps({
      currentPage: 3,
    });
    expect(wrapper.contains(<link rel="prev" href={`${props.siteUrl}${TO_PAGE({ page: 2 })}`} />)).toBe(true);
    expect(wrapper.contains(<link rel="next" href={`${props.siteUrl}${TO_PAGE({ page: 4 })}`} />)).toBe(true);
  });

  it('should render only prev page', function() {
    const wrapper = shallow(<MetaPaginator {...props} currentPage={4} pagesSum={4} />);
    expect(wrapper.contains(<link rel="prev" href={`${props.siteUrl}${TO_PAGE({ page: 3 })}`} />)).toBe(true);
    expect(wrapper.find('link[next]')).toHaveLength(0);
  });

  it('should render only next page', function() {
    const wrapper = shallow(<MetaPaginator {...props} currentPage={1} pagesSum={4} />);
    expect(wrapper.find('link[prev]')).toHaveLength(0);
    expect(wrapper.contains(<link rel="next" href={`${props.siteUrl}${TO_PAGE({ page: 2 })}`} />)).toBe(true);
  });

  it('should render neither prev nor next page', function() {
    const wrapper = shallow(<MetaPaginator {...props} currentPage={1} pagesSum={1} />);
    expect(wrapper.find('link[prev]')).toHaveLength(0);
    expect(wrapper.find('link[next]')).toHaveLength(0);
  });
});
