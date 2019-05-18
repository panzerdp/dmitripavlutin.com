declare module '*.scss' {
  const scssContent: any;
  export default cssContent;
}

declare module 'routes/path' {
  export const PATH_INDEX: string;
  export const TO_INDEX: () => string;

  export const PATH_POST: string;
  export const TO_POST: (params: { slug: string }) => string;

  export const PATH_ALL_POSTS: string;
  export const TO_ALL_POSTS: () => string;

  export const PATH_ABOUT: string;
  export const TO_ABOUT: () => string;

  export const PATH_TAG: string;
  export const TO_TAG: (params: { slug: string }) => string;

  export const PATH_PAGE: string;
  export const TO_PAGE: (params: { page: number }) => string;
}