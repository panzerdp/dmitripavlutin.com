import { PostFragment } from 'typings/graphql';

export function toPostExcerpt({ node: { frontmatter } }: { node: { frontmatter: any } }): PostExcerpt {
  return {
    ...frontmatter,
    thumbnail: frontmatter.thumbnail.childImageSharp.fluid,
  };
}

export function toPostPlain({ node: { frontmatter } }: { node: { frontmatter: PostFragment } }): PostPlain {
  return frontmatter;
}
