import * as React from 'react';
import { shallow } from 'enzyme';

import PlainListAllFetch from '../index';

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
            },
          },
        },
      ],
    },
  },
};

describe('<PlainListAllFetch />', function() {
  it('should render plain list excerpts template', function() {
    const wrapper = shallow(<PlainListAllFetch {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
