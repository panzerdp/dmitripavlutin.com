import * as React from 'react';
import { shallow } from 'enzyme';

import PostMetaStructuredData from '../index';

const post: Post = {
  description: 'Useful techniques to facilitate React server-side rendering.',
  html: '<div>JavaScript is a programming language</div>',
  modified: '2019-01-01',
  published: '2018-03-17',
  recommended: ['javascript-language'],
  slug: 'useful-techniques-react-server-side-rendering',
  tags: ['react', 'server side rendering'],
  thumbnail: {
    aspectRatio: 2,
    base64: 'base64',
    sizes: 'some sizes',
    src: '/source.png',
    srcSet: 'src-set',
  },
  title: 'Useful techniques to facilitate React server-side rendering',
};

const siteInfo = {
  title: 'Dmitri Pavlutin blog',
  description: 'Posts by Dmitri Pavlutin about software development',
  url: 'https://dmitripavlutin.com',
  repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
};

const authorInfo = {
  name: 'Dmitri Pavlutin',
  description: 'Dmitri Pavlutin is a software developer specialized in Frontend technologies',
  profiles: {
    stackoverflow: 'https://stackoverflow.com/users/1894471/dmitri-pavlutin',
    twitter: 'https://twitter.com/panzerdp',
    linkedin: 'https://www.linkedin.com/in/dmitri-pavlutin/',
    github: 'https://github.com/panzerdp',
    facebook: 'https://www.facebook.com/dmitri.pavlutin',
  },
  nicknames: {
    twitter: 'panzerdp',
  },
};

const authorProfilePictureSrc = '/profile.png';

const props = {
  post,
  siteInfo,
  authorInfo,
  authorProfilePictureSrc,
};

describe('<PostMetaStructuredData />', function() {
  it('should render structured data', function() {
    const wrapper = shallow(<PostMetaStructuredData {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
