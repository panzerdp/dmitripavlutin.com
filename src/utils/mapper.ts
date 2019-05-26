import { PostExcerptFragment } from 'typings/graphql';

export function toPostExcerpt({ node: { frontmatter } }: { node: { frontmatter: PostExcerptFragment } }): PostExcerpt {
  return {
    ...frontmatter,
    thumbnail: frontmatter.thumbnail.childImageSharp.fluid,
  };
}
