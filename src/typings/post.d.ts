interface PostRecommended<ImageType> {
  title: string;
  slug: string;
  thumbnail: ImageType;
}

interface Post<ImageType> {
  title: string;
  description: string;
  slug: string;
  publishedDate: string;
  published: string;
  modified: string;
  tags: Tags;
  recommended: string[];
  thumbnail: ImageType;
}