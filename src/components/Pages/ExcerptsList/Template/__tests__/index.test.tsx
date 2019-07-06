import * as React from 'react';
import { shallow } from 'enzyme';

import ExcerptsListTemplate from '../index';
import Layout from 'components/Layout/Fetch';
import Excerpt from 'components/Pages/ExcerptsList/Excerpt';
import MetaPaginator from 'components/Pages/ExcerptsList/Meta/Paginator';
import MetaStructuredData from 'components/Pages/ExcerptsList/Meta/StructuredData';
import MetaTags from 'components/Pages/ExcerptsList/Meta/Tags';
import Paginator from 'components/Pages/ExcerptsList/Paginator';

const props = {
  authorProfilePictureSrc: 'http://images.com/image',
  currentPage: 2,
  pagesSum: 10,
  posts: [
    {
      description: 'Useful techniques to facilitate React server-side rendering.',
      published: '2018-03-17',
      slug: 'useful-techniques-react-server-side-rendering',
      tags: ['react', 'server side rendering'],
      thumbnail: {
        aspectRatio: 2,
        base64: 'base64',
        sizes: 'some sizes',
        src: 'source',
        srcSet: 'src-set',
      },
      title: 'Useful techniques to facilitate React server-side rendering',
    },
  ],
  siteInfo: {
    title: 'Dmitri Pavlutin',
    description: 'Thoughts on Frontend development',
    metaTitle: 'Dmitri Pavlutin Blog',
    metaDescription: 'Posts by Dmitri Pavlutin about software development',
    url: 'https://dmitripavlutin.com',
    repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
  },
};

describe('<ExcerptsListTemplate />', function() {
  it('should render meta tags', function() {
    const wrapper = shallow(<ExcerptsListTemplate {...props} />);
    expect(
      wrapper
        .find(Layout)
        .contains(
          <MetaTags
            currentPage={props.currentPage}
            siteInfo={props.siteInfo}
            authorProfilePictureSrc={props.authorProfilePictureSrc}
          />
        )
    ).toBe(true);
  });

  it('should render structured meta', function() {
    const wrapper = shallow(<ExcerptsListTemplate {...props} />);
    expect(
      wrapper
        .find(Layout)
        .contains(
          <MetaStructuredData siteInfo={props.siteInfo} authorProfilePictureSrc={props.authorProfilePictureSrc} />
        )
    ).toBe(true);
  });

  it('should render meta paginator', function() {
    const wrapper = shallow(<ExcerptsListTemplate {...props} />);
    expect(
      wrapper
        .find(Layout)
        .contains(
          <MetaPaginator currentPage={props.currentPage} pagesSum={props.pagesSum} siteUrl={props.siteInfo.url} />
        )
    ).toBe(true);
  });

  it('should render post excerpts', function() {
    const wrapper = shallow(<ExcerptsListTemplate {...props} />);
    const layout = wrapper.find(Layout);
    expect(layout.find(Excerpt)).toHaveLength(1);
    expect(layout.contains(<Excerpt post={props.posts[0]} />)).toBe(true);
  });

  it('should render pagination', function() {
    const wrapper = shallow(<ExcerptsListTemplate {...props} />);
    expect(wrapper.find(Layout).contains(<Paginator currentPage={props.currentPage} pagesSum={props.pagesSum} />)).toBe(
      true
    );
  });
});
