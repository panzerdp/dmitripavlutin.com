interface PostPlain {
  title: string;
  description: string;
  published: string;
  slug: string;
  tags: Tags;
}

interface PostExcerpt extends PostPlain {
  thumbnail: FluidImage;
}

interface Post extends PostExcerpt {
  html: string;
  modified: string;
  recommended: string[];
}
