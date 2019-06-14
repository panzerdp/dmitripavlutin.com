interface PostExcerpt {
  title: string;
  description: string;
  slug: string;
  tags: Tags;
  published: string;
  thumbnail: FluidImage;
}

interface Post extends PostExcerpt {
  html: string;
  modified: string;
  recommended: string[];
  draft: boolean;
}