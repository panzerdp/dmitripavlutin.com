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
              modified: '2019-01-01',
              commentsThreadId: 'thread-id',
              slug: 'useful-techniques-react-server-side-rendering',
              tags: ['react', 'server side rendering'],
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
