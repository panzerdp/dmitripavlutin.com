import * as React from 'react';
import { shallow } from 'enzyme';

import Page404Fetch from '../index';
import Page404Template from 'components/Pages/404/Template';

const html = '<div>Not found</div>';

const props = {
  data: {
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

describe('<Page404Fetch />', function() {
  it('should render 404 template', function() {
    const wrapper = shallow(<Page404Fetch {...props} />);
    expect(wrapper.contains(<Page404Template html={html} />)).toBe(true);
  });

  it('should throw exception when no markdown edges were found', function() {
    expect(() => {
      shallow(
        <Page404Fetch
          data={{
            allMarkdownRemark: {
              edges: [],
            },
          }}
        />
      );
    }).toThrow(Error);
  });
});
