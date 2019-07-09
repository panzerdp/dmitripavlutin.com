/* eslint-disable react/jsx-key */
import * as React from 'react';
import { shallow } from 'enzyme';

import PostMetaTags from '../index';

import { TO_POST } from 'routes/path';

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
  title: 'Dmitri Pavlutin',
  description: 'Thoughts on Frontend development',
  metaTitle: 'Dmitri Pavlutin Blog',
  metaDescription: 'Posts by Dmitri Pavlutin about software development',
  url: 'https://dmitripavlutin.com',
  repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
};

const authorInfo: AuthorInfo = {
  name: 'Dmitri Pavlutin',
  description: 'Dmitri Pavlutin is a software developer specialized in Frontend technologies',
  email: 'mail@mail.com',
  jobTitle: 'Software Developer',
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

describe('<PostMetaTags />', function() {
  const postUrl = `${siteInfo.url}${TO_POST({ slug: post.slug })}`;
  const imageUrl = `${siteInfo.url}${post.thumbnail.src}`;

  it('should render indexing meta tag', function() {
    const wrapper = shallow(<PostMetaTags {...props} />);
    [
      <title>{post.title}</title>,
      <meta name="description" content={post.description} />,
      <link rel="canonical" href={postUrl} />,
    ].forEach((item) => expect(wrapper.contains(item)).toBe(true));
  });

  it('should render open graph tags', function() {
    const wrapper = shallow(<PostMetaTags {...props} />);
    [
      <meta property="og:site_name" content={siteInfo.metaTitle} />,
      <meta property="og:type" content="article" />,
      <meta property="og:title" content={post.title} />,
      <meta property="og:description" content={post.description} />,
      <meta property="og:url" content={postUrl} />,
      <meta property="og:image" content={imageUrl} />,
      <meta property="og:image:width" content="720" />,
      <meta property="og:image:height" content="400" />,
      <meta property="article:published_time" content={post.published} />,
      <meta property="article:modified_time" content={post.modified} />,
      <meta property="article:tag" content="react" />,
      <meta property="article:tag" content="server side rendering" />,
      <meta property="article:author" content={authorInfo.profiles.facebook} />,
    ].forEach((item) => expect(wrapper.contains(item)).toBe(true));
  });

  it('should render twitter card tags', function() {
    const wrapper = shallow(<PostMetaTags {...props} />);
    [
      <meta name="twitter:card" content="summary_large_image" />,
      <meta name="twitter:title" content={post.title} />,
      <meta name="twitter:description" content={post.description} />,
      <meta name="twitter:url" content={postUrl} />,
      <meta name="twitter:image" content={imageUrl} />,
      <meta name="twitter:label1" content="Written by" />,
      <meta name="twitter:data1" content={authorInfo.name} />,
      <meta name="twitter:label2" content="Filed under" />,
      <meta name="twitter:data2" content={post.tags.join(', ')} />,
      <meta name="twitter:creator" content={`@${authorInfo.nicknames.twitter}`} />,
    ].forEach((item) => expect(wrapper.contains(item)).toBe(true));
  });
});
