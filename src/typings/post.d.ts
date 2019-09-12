interface PostPlain {
  title: string;
  description: string;
  published: string;
  modified: string;
  slug: string;
  tags: Tags;
  commentsThreadId: string | undefined;
}

interface Post<Image = FluidImage> extends PostPlain {
  thumbnail: Image;
}

interface PostDetailed<Image = FluidImage> extends Post<Image> {
  html: string;
  recommended: string[];
}
