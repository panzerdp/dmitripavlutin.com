import * as React from 'react';
import { shallow } from 'enzyme';

import PlainListByTagFetch from '../index';

const props = {
  pageContext: {
    tag: 'javascript',
  },
  data: {
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
};

describe('<PlainListByTagFetch />', function() {
  it('should render plain list by tag template', function() {
    const wrapper = shallow(<PlainListByTagFetch {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
