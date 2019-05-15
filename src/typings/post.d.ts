interface PostFrontmatter {
  title: string;
  description: string;
  slug: string;
  publishedDate: string;
  published: string;
  modified: string;
  tags: Tags;
  recommended: string[];
  thumbnail {
    childImageSharp {
      sizes(maxWidth: 720, maxHeight: 350, quality: 90) {
        ...GatsbyImageSharpSizes
      }
    }
  }
}

interface Post {
  id: string;
  html: string;
  fileAbsolutePath: string;
  frontmatter: PostFrontmatter;
}