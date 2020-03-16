import * as React from 'react';
import { shallow } from 'enzyme';

import PostRightSidebar from '../index';
import SidebarItemsCommon from 'components/SidebarItems/Common';
import PopularPosts from 'components/Popular/Posts';
import PopularTagsFetch from 'components/Popular/Tags/Fetch';
import PopularTagsList from 'components/Popular/Tags/List';

const popularPosts = [
  {
    description: 'Useful techniques to facilitate React server-side rendering.',
    published: '2018-03-17',
    modified: '2019-01-01',
    commentsThreadId: 'thread-id',
    slug: 'useful-techniques-react-server-side-rendering',
    tags: ['react', 'server side rendering'],
    title: 'Useful techniques to facilitate React server-side rendering',
    thumbnail: {
      src: 'src',
      srcSet: 'src-set',
      width: 100,
      height: 100,
    },
  },
];

const props = {
  popularPosts,
  siteUrl: 'http://example.com',
};

describe('<PostRightSidebar />', function() {
  it('should render common sidebar items', function() {
    const wrapper = shallow(<PostRightSidebar {...props} />);
    expect(wrapper.contains(<SidebarItemsCommon />)).toBe(true);
  });

  it('should render popular posts', function() {
    const wrapper = shallow(<PostRightSidebar {...props} />);
    expect(wrapper.contains(<PopularPosts posts={props.popularPosts} siteUrl={props.siteUrl} />));
  });

  it('should render popular tags', function() {
    const wrapper = shallow(<PostRightSidebar {...props} />);
    const authorWrapper = wrapper.find(PopularTagsFetch).renderProp('render')(popularPosts);
    expect(
      authorWrapper.contains(
        <PopularTagsList posts={props.popularPosts} title="Explore popular tags" limit={20} />
      )
    );
  });
});
