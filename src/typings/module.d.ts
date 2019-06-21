declare module '*.scss' {
  const scssContent: {
    [index: string]: string;
  };
  export default scssContent;
}

declare module 'routes/path' {
  export const PATH_INDEX: string;
  export const TO_INDEX: () => string;

  export const PATH_POST: string;
  export const TO_POST: (params: { slug: string }) => string;

  export const PATH_ALL_POSTS: string;
  export const TO_ALL_POSTS: () => string;

  export const PATH_ABOUT_ME: string;
  export const TO_ABOUT_ME: () => string;

  export const PATH_TAG: string;
  export const TO_TAG: (params: { slug: string }) => string;

  export const PATH_PAGE: string;
  export const TO_PAGE: (params: { page: number }) => string;
}

declare module 'gatsby-plugin-disqus' {
  export default (params: { url?: string; title?: string }) => JSX.Element;
}

declare module 'react-twitter-embed' {
  export const TwitterFollowButton: (params: { screenName: string }) => JSX.Element;
}
