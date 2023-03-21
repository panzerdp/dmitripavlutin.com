import { PostFragment } from 'graphql-types'
import { Post, PostPlain } from 'typings/post'

export function toPostImageFluid({ node: { frontmatter } }: { node: { frontmatter: any } }): Post {
  return {
    ...frontmatter,
    thumbnail: frontmatter.thumbnail.childImageSharp.gatsbyImageData,
  }
}

export function toPostImageFixed({ node: { frontmatter } }: { node: { frontmatter: any } }): Post {
  return {
    ...frontmatter,
    thumbnail: frontmatter.thumbnail.childImageSharp.gatsbyImageData,
  }
}

export function toPostPlain({ node: { frontmatter } }: { node: { frontmatter: PostFragment } }): PostPlain {
  return frontmatter
}
