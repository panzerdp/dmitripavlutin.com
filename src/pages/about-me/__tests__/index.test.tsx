import * as React from 'react';
import { shallow } from 'enzyme';

import AboutFetch from '../index';
import AboutTemplate from 'components/Pages/About/Template';

const html = '<div>Author info</div>';

const authorInfo: AuthorInfo = {
  name: 'Dmitri Pavlutin',
  description: 'Dmitri Pavlutin is a software developer specialized in Frontend technologies',
  email: 'mail@mail.com',
  jobTitle: 'Software Developer',
  nicknames: {
    twitter: 'panzerdp',
  },
  profiles: {
    facebook: 'https://www.facebook.com/dmitri.pavlutin',
    github: 'https://github.com/panzerdp',
    linkedin: 'https://www.linkedin.com/in/dmitri-pavlutin/',
    stackoverflow: 'https://stackoverflow.com/users/1894471/dmitri-pavlutin',
    twitter: 'https://twitter.com/panzerdp',
  },
};

const siteInfo = {
  title: 'Dmitri Pavlutin',
  description: 'Thoughts on Frontend development',
  metaTitle: 'Dmitri Pavlutin Blog',
  metaDescription: 'Posts by Dmitri Pavlutin about software development',
  url: 'https://dmitripavlutin.com',
  repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
};

const authorProfilePicture = {
  width: 100,
  height: 100,
  base64: 'base64-encoded-string',
  src: '/image.png',
  srcSet: 'some srcset values',
};

const props = {
  data: {
    site: {
      siteMetadata: {
        authorInfo,
        siteInfo,
      },
    },
    allMarkdownRemark: {
      edges: [
        {
          node: {
            html,
          },
        },
      ],
    },
    authorProfilePicture: {
      childImageSharp: {
        resize: authorProfilePicture,
      },
    },
  },
};

describe('<AboutFetch />', function() {
  it('should render about template', function() {
    const wrapper = shallow(<AboutFetch {...props} />);
    expect(
      wrapper.contains(
        <AboutTemplate html={html} authorInfo={authorInfo} siteInfo={siteInfo} authorProfilePictureSrc="/image.png" />
      )
    ).toBe(true);
  });

  it('should throw exception when no markdown edges were found', function() {
    expect(() => {
      shallow(
        <AboutFetch
          data={{
            ...props.data,
            allMarkdownRemark: {
              edges: [],
            },
          }}
        />
      );
    }).toThrow(Error);
  });
});
