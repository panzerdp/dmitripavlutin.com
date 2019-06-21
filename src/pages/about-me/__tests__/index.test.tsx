import * as React from 'react';
import { shallow } from 'enzyme';

import AboutFetch from '../index';
import AboutTemplate from 'components/Pages/About/Template';

const html = '<div>Author info</div>';

const authorInfo: AuthorInfo = {
  name: 'Dmitri Pavlutin',
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
  description: 'Dmitri Pavlutin is a software developer specialized in Frontend technologies',
};

const props = {
  data: {
    site: {
      siteMetadata: {
        authorInfo,
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
  },
};

describe('<AboutFetch />', function() {
  it('should render about template', function() {
    const wrapper = shallow(<AboutFetch {...props} />);
    expect(wrapper.contains(<AboutTemplate html={html} authorInfo={authorInfo} />)).toBe(true);
  });

  it('should throw exception when no markdown edges were found', function() {
    expect(() => {
      shallow(
        <AboutFetch
          data={{
            site: {
              siteMetadata: {
                authorInfo,
              },
            },
            allMarkdownRemark: {
              edges: [],
            },
          }}
        />
      );
    }).toThrow(Error);
  });
});
