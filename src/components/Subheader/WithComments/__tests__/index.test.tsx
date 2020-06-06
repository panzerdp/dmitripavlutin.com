import * as React from 'react';
import { shallow } from 'enzyme';

import SubheaderWithComments from '../index';
import { formatDate } from 'utils/date';
import { TO_POST } from 'routes/path';

const post: PostPlain = {
  title: 'Post 1',
  description: 'Description',
  slug: 'post-1',
  tags: ['tag1', 'tag2'],
  published: '2019-01-01',
  modified: '2019-01-01',
  commentsThreadId: 'thread-id',
};

const props = {
  post,
  siteUrl: 'http://example.com/',
};

describe('<SubheaderWithComments />', function() {
  it('should render post published date', function() {
    const wrapper = shallow(<SubheaderWithComments {...props} />);
    expect(wrapper.text()).toContain(`Posted ${formatDate(post.published)}`);
  });

  it('should render post modified date', function() {
    const updatedProps = {
      ...props,
      post: {
        ...post,
        modified: '2019-03-05'
      }
    };
    const wrapper = shallow(<SubheaderWithComments {...updatedProps} />);
    expect(wrapper.text()).toContain(`Updated ${formatDate(updatedProps.post.modified)}`);
  });

  it('should render the comments count', function() {
    const wrapper = shallow(<SubheaderWithComments {...props} />);
    const postUrl = TO_POST({ slug: post.slug });
    expect(wrapper.find(`a[href="${postUrl}#comments"] CommentsCount`)).toHaveLength(1);
  });

  it('should render post tags', function() {
    const wrapper = shallow(<SubheaderWithComments {...props} />);
    post.tags.forEach((tag) => {
      expect(wrapper.find({ tag }).is('Tag')).toBe(true);
    });
  });
});
