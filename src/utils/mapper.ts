import { PostFragment } from 'typings/graphql';

export function toPostImageFluid({ node: { frontmatter } }: { node: { frontmatter: any } }): Post<FluidImage> {
  return {
    ...frontmatter,
    thumbnail: frontmatter.thumbnail.childImageSharp.fluid,
  };
}

export function toPostImageFixed({ node: { frontmatter } }: { node: { frontmatter: any } }): Post<FixedImage> {
  return {
    ...frontmatter,
    thumbnail: frontmatter.thumbnail.childImageSharp.fixed,
  };
}

export function toPostPlain({ node: { frontmatter } }: { node: { frontmatter: PostFragment } }): PostPlain {
  return frontmatter;
}
