import * as React from 'react';
import { shallow } from 'enzyme';
import Link from 'gatsby-link';

import Paginator from '../index';
import { TO_INDEX, TO_PAGE } from 'routes/path';

describe('<ExcerptsLisPaginator />', function() {
  it('should render pages links', function() {
    const wrapper = shallow(<Paginator currentPage={2} pagesSum={6} />);
    const items = [
      <Link key={0} to={TO_INDEX()} className="">
        {1}
      </Link>,
      <Link key={1} to={TO_PAGE({ page: 2 })} className="selected">
        {2}
      </Link>,
      <Link key={2} to={TO_PAGE({ page: 3 })} className="">
        {3}
      </Link>,
      <Link key={3} to={TO_PAGE({ page: 4 })} className="">
        {4}
      </Link>,
      <div key={4} className="nextPrev">
        [...]
      </div>,
      <Link key={5} to={TO_PAGE({ page: 6 })} className="">
        {6}
      </Link>,
    ];
    expect(wrapper.contains(items)).toBe(true);
  });

  it('should render prev page link', function() {
    const wrapper = shallow(<Paginator currentPage={2} pagesSum={4} />);
    expect(
      wrapper.contains(
        <Link className="nextPrev" to={TO_INDEX()}>
          prev
        </Link>
      )
    ).toBe(true);
  });

  it('should render disabled prev page link', function() {
    const wrapper = shallow(<Paginator currentPage={1} pagesSum={4} />);
    expect(wrapper.contains(<div className="nextPrev">prev</div>)).toBe(true);
  });

  it('should render next page link', function() {
    const wrapper = shallow(<Paginator currentPage={2} pagesSum={4} />);
    expect(
      wrapper.contains(
        <Link className="nextPrev" to={TO_PAGE({ page: 3 })}>
          next
        </Link>
      )
    ).toBe(true);
  });

  it('should render disabled next page link', function() {
    const wrapper = shallow(<Paginator currentPage={4} pagesSum={4} />);
    expect(wrapper.contains(<div className="nextPrev">next</div>)).toBe(true);
  });

  it('should render pagination for 0 pages', function() {
    const wrapper = shallow(<Paginator currentPage={0} pagesSum={0} />);
    expect(wrapper.type()).toBeNull();
  });
});
