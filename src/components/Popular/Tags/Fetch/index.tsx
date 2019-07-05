import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import { PopularTagsFetchQuery } from 'typings/graphql';
import { toPostPlain } from 'utils/mapper';

interface PopularTagsFetch {
  render(posts: PostPlain[]): React.ReactNode;
}

/* istanbul ignore next */
export default function PopularTagsFetch({ render }: PopularTagsFetch) {
  return (
    <StaticQuery
      query={graphql`
        query PopularTagsFetch {
          allMarkdownRemark(filter: { frontmatter: { type: { eq: "post" } } }, limit: 1000) {
            edges {
              node {
                frontmatter {
                  ...Post
                }
              }
            }
          }
        }
      `}
      render={(data: PopularTagsFetchQuery) => render(data.allMarkdownRemark.edges.map(toPostPlain))}
    />
  );
}
