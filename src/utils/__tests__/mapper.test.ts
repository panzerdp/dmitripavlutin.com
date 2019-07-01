import { toPostExcerpt } from '../mapper';
import { PostExcerptFragment } from 'typings/graphql';

const fluidImage = {
  src: 'test',
  base64: 'test',
  aspectRatio: 1,
  srcSet: 'test',
  sizes: 'test',
  srcWebp: 'src-webp',
  srcSetWebp: 'src-set-webp',
};

const postExcerptFragment: PostExcerptFragment = {
  title: 'Title',
  description: 'Description',
  published: '2019-01-01',
  slug: 'title',
  tags: ['tag1', 'tag2'],
  thumbnail: {
    childImageSharp: {
      fluid: fluidImage,
    },
  },
};

const edge = {
  node: {
    frontmatter: postExcerptFragment,
  },
};

describe('toPostExcerpt()', function() {
  test('should map to post excerpt', function() {
    expect(toPostExcerpt(edge)).toStrictEqual({
      title: 'Title',
      description: 'Description',
      published: '2019-01-01',
      slug: 'title',
      tags: ['tag1', 'tag2'],
      thumbnail: fluidImage,
    });
  });
});
