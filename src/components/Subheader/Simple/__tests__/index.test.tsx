import { shallow } from 'enzyme';

import SubheaderSimple from '../index';
import { formatDate } from 'utils/date';

const post: PostPlain = {
  title: 'Post 1',
  description: 'Description',
  slug: 'post-1',
  tags: ['tag1', 'tag2'],
  published: '2019-01-01',
  modified: '2019-01-01',
  commentsThreadId: 'thread-id',
};

describe('<SubheaderSimple />', function() {
  it('should render post published date', function() {
    const wrapper = shallow(<SubheaderSimple post={post} />);
    expect(wrapper.text()).toContain(formatDate(post.published));
  });

  it('should render post tags', function() {
    const wrapper = shallow(<SubheaderSimple post={post} />);
    post.tags.forEach((tag) => {
      expect(wrapper.find({ tag }).is('Tag')).toBe(true);
    });
  });
});
