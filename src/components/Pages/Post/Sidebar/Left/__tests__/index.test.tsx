import * as React from 'react';
import { shallow } from 'enzyme';

import PostLeftSidebar from '../index';
import ShareGroupVertical from 'components/Pages/Post/Share/Group/Vertical';
import { TO_POST } from 'routes/path';

const post: PostPlain = {
  description: 'Useful techniques to facilitate React server-side rendering.',
  published: '2018-03-17',
  modified: '2019-01-01',
  commentsThreadId: 'thread-id',
  slug: 'useful-techniques-react-server-side-rendering',
  tags: ['react', 'server side rendering'],
  title: 'Useful techniques to facilitate React server-side rendering',
};

const props = {
  siteUrl: 'http://example.com',
  post,
  showShareButtons: false,
  twitterName: 'panzerdp',
};

describe('<PostLeftSidebar />', function() {
  it('should render vertical share group', function() {
    const wrapper = shallow(<PostLeftSidebar {...props} />);
    expect(
      wrapper.contains(
        <ShareGroupVertical
          url={`${props.siteUrl}${TO_POST({ slug: post.slug })}`}
          text={post.title}
          tags={post.tags}
          show={props.showShareButtons}
          twitterName={props.twitterName}
        />
      )
    ).toBe(true);
  });
});
