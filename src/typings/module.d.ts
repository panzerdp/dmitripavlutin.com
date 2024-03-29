declare module '*.scss';

declare module 'routes/path' {
  export const PATH_INDEX: string
  export const TO_INDEX: () => string

  export const PATH_POST: string
  export const TO_POST: (params: { slug: string }) => string

  export const PATH_ALL_POSTS: string
  export const TO_ALL_POSTS: () => string

  export const PATH_ABOUT_ME: string
  export const TO_ABOUT_ME: () => string

  export const PATH_TAG: string
  export const TO_TAG: (params: { slug: string }) => string

  export const PATH_PAGE: string
  export const TO_PAGE: (params: { page: number }) => string

  export const PATH_NEWSLETTER: string
  export const TO_NEWSLETTER: () => string

  export const PATH_SEARCH: string
  export const TO_SEARCH: () => string

  export const PATH_RSS: string
  export const TO_RSS: () => string

  export const PATH_PRIVACY_POLICY: string
  export const TO_PRIVACY_POLICY: () => string

  export const PATH_CONTACT: string
  export const TO_CONTACT: () => string

  export const PATH_TERMS: string
  export const TO_TERMS: () => string
}

declare module 'react-twitter-embed' {
  export const TwitterFollowButton: (params: { screenName: string }) => JSX.Element
}
