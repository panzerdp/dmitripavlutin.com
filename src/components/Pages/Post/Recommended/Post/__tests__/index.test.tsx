import { shallow } from 'enzyme';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import PostRecommendedExcerpt from '../index';
import Tag from 'components/Tag';
import { TO_POST } from 'routes/path';

const post: Post<FixedImage> = {
  title: 'Post 1',
  description: 'Description',
  slug: 'post-1',
  tags: ['tag1', 'tag2'],
  published: '2019-01-01',
  modified: '2019-01-01',
  commentsThreadId: 'thread-id',
  thumbnail: {
    src: 'src',
    srcSet: 'src-set',
    width: 100,
    height: 100,
  },
};

const props = {
  post,
};

describe('<PostRecommendedExcerpt />', function() {
  it('should render the link to post', function() {
    const wrapper = shallow(<PostRecommendedExcerpt {...props} />);
    const to = TO_POST({ slug: post.slug });
    expect(wrapper.contains(<Link to={to}>{post.title}</Link>)).toBe(true);
  });

  it('should render the post thumbnail', function() {
    const wrapper = shallow(<PostRecommendedExcerpt {...props} />);
    expect(wrapper.contains(<Img fixed={post.thumbnail} />)).toBe(true);
  });

  it('should render post tags', function() {
    const wrapper = shallow(<PostRecommendedExcerpt {...props} />);
    post.tags.forEach((tag) => expect(wrapper.contains(<Tag tag={tag} />)).toBe(true));
  });
});
