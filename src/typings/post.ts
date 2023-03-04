import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface PostPlain {
  title: string;
  description: string;
  published: string;
  modified: string;
  slug: string;
  tags: Tags;
  commentsCount?: number;
}

export interface Post extends PostPlain {
  thumbnail: IGatsbyImageData;
}

export interface PostDetailed extends Post {
  children: JSX.Element;
  tableOfContents: unknown;
  recommended: string[];
}
