interface FluidImage {
  aspectRatio: number
  src: string
  srcSet: string
  sizes: string
  base64?: string
  tracedSVG?: string
  srcWebp?: string
  srcSetWebp?: string
}

interface RecommendedPost {
  title: string;
  slug: string;
  thumbnail: FluidImage;
}

interface Post {
  title: string;
  description: string;
  html: string;
  slug: string;
  publishedDate: string;
  published: string;
  modified: string;
  tags: Tags;
  recommended: string[];
  thumbnail: FluidImage;
}