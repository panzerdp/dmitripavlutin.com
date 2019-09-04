import * as React from 'react';
import { shallow } from 'enzyme';

import PopularTagsList from '../index';
import Tag from 'components/Tag';

const posts: PostPlain[] = [
  {
    description: 'Useful techniques to facilitate React server-side rendering.',
    published: '2018-03-17',
    modified: '2019-01-01',
    commentsThreadId: 'thread-id',
    slug: 'useful-techniques-react-server-side-rendering',
    tags: ['react', 'arrow function', 'arrow', 'javascript', 'server'],
    title: 'Useful techniques to facilitate React server-side rendering',
  },
  {
    description: 'JavaScript arrow functions in details',
    published: '2018-03-17',
    modified: '2019-01-01',
    commentsThreadId: 'thread-id',
    slug: 'javascript-arrow-functions',
    tags: ['arrow function', 'react', 'function', 'javascript'],
    title: 'JavaScript arrow functions in details',
  },
];

describe('<PopularTagsList />', function() {
  it('should render the list title', function() {
    const wrapper = shallow(<PopularTagsList posts={posts} title="Popular posts" />);
    expect(wrapper.text()).toContain('Popular posts');
  });

  it('should render the popular tags', function() {
    const wrapper = shallow(<PopularTagsList posts={posts} title="Popular posts" />);
    const tagComponents = wrapper.find(Tag);
    const tags = ['arrow function', 'javascript', 'react', 'arrow', 'function', 'server'];
    for (let index = 0; index < tagComponents.length; index++) {
      const tagComponent = tagComponents.at(index);
      expect(tagComponent.prop('tag')).toBe(tags[index]);
    }
  });

  it('should limit the displayed tags', function() {
    const wrapper = shallow(<PopularTagsList posts={posts} title="Popular posts" limit={2} />);
    const tagComponents = wrapper.find(Tag);
    const tags = ['arrow function', 'javascript'];
    for (let index = 0; index < tagComponents.length; index++) {
      const tagComponent = tagComponents.at(index);
      expect(tagComponent.prop('tag')).toBe(tags[index]);
    }
  });
});
