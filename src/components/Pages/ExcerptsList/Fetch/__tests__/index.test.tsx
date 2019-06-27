import * as React from 'react';
import { shallow } from 'enzyme';

import ExcerptsFetch from '../index';

const siteInfo = {
  title: 'Dmitri Pavlutin blog',
  description: 'Posts by Dmitri Pavlutin about software development',
  url: 'https://dmitripavlutin.com',
  repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
};

const authorProfilePicture = {
  width: 100,
  height: 100,
  base64: 'base64-encoded-string',
  src: 'http://images.com/image',
  srcSet: 'some srcset values',
};

const authorInfo = {
  name: 'Dmitri Pavlutin',
  description: 'Dmitri Pavlutin is a software developer specialized in Frontend technologies',
  email: 'mail@mail.com',
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

const props = {
  data: {
    site: {
      siteMetadata: {
        siteInfo,
        authorInfo,
      },
    },
    authorProfilePicture: {
      childImageSharp: {
        resize: authorProfilePicture,
      },
    },
    allMarkdownRemark: {
      edges: [
        {
          node: {
            frontmatter: {
              title: 'Useful techniques to facilitate React server-side rendering',
              description: 'Useful techniques to facilitate React server-side rendering.',
              published: '2018-03-17',
              slug: 'useful-techniques-react-server-side-rendering',
              tags: ['react', 'server side rendering'],
              thumbnail: {
                childImageSharp: {
                  fluid: {
                    src: 'source',
                    base64: 'base64',
                    aspectRatio: 2,
                    srcSet: 'src-set',
                    sizes: 'some sizes',
                  },
                },
              },
            },
          },
        },
      ],
    },
  },
  pageContext: {
    currentPage: 2,
    pagesSum: 10,
  },
};

describe('<ExcerptsFetch />', function() {
  it('should render excerpts template', function() {
    const wrapper = shallow(<ExcerptsFetch {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
