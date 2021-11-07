export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  /** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
  ID: string;
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string;
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean;
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: number;
  /** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};










export type File = Node & {
  sourceInstanceName: Scalars['String'];
  absolutePath: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  size: Scalars['Int'];
  prettySize: Scalars['String'];
  modifiedTime: Scalars['Date'];
  accessTime: Scalars['Date'];
  changeTime: Scalars['Date'];
  birthTime: Scalars['Date'];
  root: Scalars['String'];
  dir: Scalars['String'];
  base: Scalars['String'];
  ext: Scalars['String'];
  name: Scalars['String'];
  relativeDirectory: Scalars['String'];
  dev: Scalars['Int'];
  mode: Scalars['Int'];
  nlink: Scalars['Int'];
  uid: Scalars['Int'];
  gid: Scalars['Int'];
  rdev: Scalars['Int'];
  ino: Scalars['Float'];
  atimeMs: Scalars['Float'];
  mtimeMs: Scalars['Float'];
  ctimeMs: Scalars['Float'];
  atime: Scalars['Date'];
  mtime: Scalars['Date'];
  ctime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  birthtime: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  birthtimeMs: Maybe<Scalars['Float']>;
  blksize: Maybe<Scalars['Int']>;
  blocks: Maybe<Scalars['Int']>;
  /** Copy file to static directory and return public url to it */
  publicURL: Maybe<Scalars['String']>;
  /** Returns all children nodes filtered by type MarkdownRemark */
  childrenMarkdownRemark: Maybe<Array<Maybe<MarkdownRemark>>>;
  /** Returns the first child node of type MarkdownRemark or null if there are no children of given type on this node */
  childMarkdownRemark: Maybe<MarkdownRemark>;
  /** Returns all children nodes filtered by type ImageSharp */
  childrenImageSharp: Maybe<Array<Maybe<ImageSharp>>>;
  /** Returns the first child node of type ImageSharp or null if there are no children of given type on this node */
  childImageSharp: Maybe<ImageSharp>;
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type FileModifiedTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type FileAccessTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type FileChangeTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type FileBirthTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type FileAtimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type FileMtimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type FileCtimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};

/** Node Interface */
export type Node = {
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type Internal = {
  content: Maybe<Scalars['String']>;
  contentDigest: Scalars['String'];
  description: Maybe<Scalars['String']>;
  fieldOwners: Maybe<Array<Maybe<Scalars['String']>>>;
  ignoreType: Maybe<Scalars['Boolean']>;
  mediaType: Maybe<Scalars['String']>;
  owner: Scalars['String'];
  type: Scalars['String'];
};


export type Directory = Node & {
  sourceInstanceName: Scalars['String'];
  absolutePath: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  size: Scalars['Int'];
  prettySize: Scalars['String'];
  modifiedTime: Scalars['Date'];
  accessTime: Scalars['Date'];
  changeTime: Scalars['Date'];
  birthTime: Scalars['Date'];
  root: Scalars['String'];
  dir: Scalars['String'];
  base: Scalars['String'];
  ext: Scalars['String'];
  name: Scalars['String'];
  relativeDirectory: Scalars['String'];
  dev: Scalars['Int'];
  mode: Scalars['Int'];
  nlink: Scalars['Int'];
  uid: Scalars['Int'];
  gid: Scalars['Int'];
  rdev: Scalars['Int'];
  ino: Scalars['Float'];
  atimeMs: Scalars['Float'];
  mtimeMs: Scalars['Float'];
  ctimeMs: Scalars['Float'];
  atime: Scalars['Date'];
  mtime: Scalars['Date'];
  ctime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  birthtime: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  birthtimeMs: Maybe<Scalars['Float']>;
  blksize: Maybe<Scalars['Int']>;
  blocks: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type DirectoryModifiedTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type DirectoryAccessTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type DirectoryChangeTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type DirectoryBirthTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type DirectoryAtimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type DirectoryMtimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type DirectoryCtimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};

export type Site = Node & {
  buildTime: Maybe<Scalars['Date']>;
  siteMetadata: Maybe<SiteSiteMetadata>;
  port: Maybe<Scalars['Int']>;
  host: Maybe<Scalars['String']>;
  pathPrefix: Maybe<Scalars['String']>;
  flags: Maybe<SiteFlags>;
  polyfill: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type SiteBuildTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};

export type SiteFlags = {
  DEV_SSR: Maybe<Scalars['Boolean']>;
};

export type SiteSiteMetadata = {
  title: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  siteUrl: Maybe<Scalars['String']>;
  siteInfo: Maybe<SiteSiteMetadataSiteInfo>;
  authorInfo: Maybe<SiteSiteMetadataAuthorInfo>;
  emailSubscriptionService: Maybe<SiteSiteMetadataEmailSubscriptionService>;
  carbonAdsService: Maybe<SiteSiteMetadataCarbonAdsService>;
  featured: Maybe<SiteSiteMetadataFeatured>;
  googleCustomSearchId: Maybe<Scalars['String']>;
  githubCommentsRepository: Maybe<Scalars['String']>;
};

export type SiteSiteMetadataSiteInfo = {
  title: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  metaTitle: Maybe<Scalars['String']>;
  metaDescription: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
  repositoryUrl: Maybe<Scalars['String']>;
};

export type SiteSiteMetadataAuthorInfo = {
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  jobTitle: Maybe<Scalars['String']>;
  profiles: Maybe<SiteSiteMetadataAuthorInfoProfiles>;
  nicknames: Maybe<SiteSiteMetadataAuthorInfoNicknames>;
};

export type SiteSiteMetadataAuthorInfoProfiles = {
  stackoverflow: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  linkedin: Maybe<Scalars['String']>;
  github: Maybe<Scalars['String']>;
  facebook: Maybe<Scalars['String']>;
};

export type SiteSiteMetadataAuthorInfoNicknames = {
  twitter: Maybe<Scalars['String']>;
};

export type SiteSiteMetadataEmailSubscriptionService = {
  endpoint: Maybe<Scalars['String']>;
  hiddenFieldName: Maybe<Scalars['String']>;
};

export type SiteSiteMetadataCarbonAdsService = {
  scriptSrc: Maybe<Scalars['String']>;
  isEnabled: Maybe<Scalars['Boolean']>;
  isProductionMode: Maybe<Scalars['Boolean']>;
};

export type SiteSiteMetadataFeatured = {
  popularPostsByCategory: Maybe<Array<Maybe<SiteSiteMetadataFeaturedPopularPostsByCategory>>>;
};

export type SiteSiteMetadataFeaturedPopularPostsByCategory = {
  category: Maybe<Scalars['String']>;
  slugs: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SiteFunction = Node & {
  functionRoute: Scalars['String'];
  pluginName: Scalars['String'];
  originalAbsoluteFilePath: Scalars['String'];
  originalRelativeFilePath: Scalars['String'];
  relativeCompiledFilePath: Scalars['String'];
  absoluteCompiledFilePath: Scalars['String'];
  matchPath: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type SitePage = Node & {
  path: Scalars['String'];
  component: Scalars['String'];
  internalComponentName: Scalars['String'];
  componentChunkName: Scalars['String'];
  matchPath: Maybe<Scalars['String']>;
  isCreatedByStatefulCreatePages: Maybe<Scalars['Boolean']>;
  pluginCreator: Maybe<SitePlugin>;
  pluginCreatorId: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  context: Maybe<SitePageContext>;
};

export type SitePageContext = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  currentPage: Maybe<Scalars['Int']>;
  pagesSum: Maybe<Scalars['Int']>;
  popularPostsSlugs: Maybe<Array<Maybe<Scalars['String']>>>;
  slug: Maybe<Scalars['String']>;
  recommended: Maybe<Array<Maybe<Scalars['String']>>>;
  githubIssueSearchQuery: Maybe<Scalars['String']>;
  tag: Maybe<Scalars['String']>;
};

export type SitePlugin = Node & {
  resolve: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  version: Maybe<Scalars['String']>;
  nodeAPIs: Maybe<Array<Maybe<Scalars['String']>>>;
  browserAPIs: Maybe<Array<Maybe<Scalars['String']>>>;
  ssrAPIs: Maybe<Array<Maybe<Scalars['String']>>>;
  pluginFilepath: Maybe<Scalars['String']>;
  pluginOptions: Maybe<SitePluginPluginOptions>;
  packageJson: Maybe<SitePluginPackageJson>;
  subPluginPaths: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type SitePluginPluginOptions = {
  plugins: Maybe<Array<Maybe<SitePluginPluginOptionsPlugins>>>;
  tight: Maybe<Scalars['Boolean']>;
  fromHeading: Maybe<Scalars['Int']>;
  defaults: Maybe<SitePluginPluginOptionsDefaults>;
  base64Width: Maybe<Scalars['Int']>;
  stripMetadata: Maybe<Scalars['Boolean']>;
  defaultQuality: Maybe<Scalars['Int']>;
  failOnError: Maybe<Scalars['Boolean']>;
  linkImagesToOriginal: Maybe<Scalars['Boolean']>;
  sizeByPixelDensity: Maybe<Scalars['Boolean']>;
  quality: Maybe<Scalars['Int']>;
  withWebp: Maybe<Scalars['Boolean']>;
  maxWidth: Maybe<Scalars['Int']>;
  showCaptions: Maybe<Scalars['Boolean']>;
  markdownCaptions: Maybe<Scalars['Boolean']>;
  backgroundColor: Maybe<Scalars['String']>;
  tracedSVG: Maybe<Scalars['Boolean']>;
  loading: Maybe<Scalars['String']>;
  decoding: Maybe<Scalars['String']>;
  disableBgImageOnAlpha: Maybe<Scalars['Boolean']>;
  disableBgImage: Maybe<Scalars['Boolean']>;
  wrapperStyle: Maybe<Scalars['String']>;
  theme: Maybe<Scalars['String']>;
  vfsRoot: Maybe<Scalars['String']>;
  defaultText: Maybe<Scalars['String']>;
  directory: Maybe<Scalars['String']>;
  html: Maybe<Scalars['String']>;
  target: Maybe<Scalars['String']>;
  icon: Maybe<Scalars['String']>;
  offsetY: Maybe<Scalars['Int']>;
  className: Maybe<Scalars['String']>;
  isTSX: Maybe<Scalars['Boolean']>;
  jsxPragma: Maybe<Scalars['String']>;
  allExtensions: Maybe<Scalars['Boolean']>;
  path: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  trackingId: Maybe<Scalars['String']>;
  head: Maybe<Scalars['Boolean']>;
  anonymize: Maybe<Scalars['Boolean']>;
  respectDNT: Maybe<Scalars['Boolean']>;
  pageTransitionDelay: Maybe<Scalars['Int']>;
  enableWebVitalsTracking: Maybe<Scalars['Boolean']>;
  documentPaths: Maybe<Array<Maybe<Scalars['String']>>>;
  codegenConfig: Maybe<SitePluginPluginOptionsCodegenConfig>;
  output: Maybe<Scalars['String']>;
  createLinkInHead: Maybe<Scalars['Boolean']>;
  entryLimit: Maybe<Scalars['Int']>;
  query: Maybe<Scalars['String']>;
  sassOptions: Maybe<SitePluginPluginOptionsSassOptions>;
  feeds: Maybe<Array<Maybe<SitePluginPluginOptionsFeeds>>>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  pathCheck: Maybe<Scalars['Boolean']>;
};

export type SitePluginPluginOptionsPlugins = {
  resolve: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  version: Maybe<Scalars['String']>;
  pluginOptions: Maybe<SitePluginPluginOptionsPluginsPluginOptions>;
  nodeAPIs: Maybe<Array<Maybe<Scalars['String']>>>;
  browserAPIs: Maybe<Array<Maybe<Scalars['String']>>>;
  ssrAPIs: Maybe<Array<Maybe<Scalars['String']>>>;
  pluginFilepath: Maybe<Scalars['String']>;
};

export type SitePluginPluginOptionsPluginsPluginOptions = {
  tight: Maybe<Scalars['Boolean']>;
  fromHeading: Maybe<Scalars['Int']>;
  defaults: Maybe<SitePluginPluginOptionsPluginsPluginOptionsDefaults>;
  base64Width: Maybe<Scalars['Int']>;
  stripMetadata: Maybe<Scalars['Boolean']>;
  defaultQuality: Maybe<Scalars['Int']>;
  failOnError: Maybe<Scalars['Boolean']>;
  linkImagesToOriginal: Maybe<Scalars['Boolean']>;
  sizeByPixelDensity: Maybe<Scalars['Boolean']>;
  quality: Maybe<Scalars['Int']>;
  withWebp: Maybe<Scalars['Boolean']>;
  maxWidth: Maybe<Scalars['Int']>;
  showCaptions: Maybe<Scalars['Boolean']>;
  markdownCaptions: Maybe<Scalars['Boolean']>;
  backgroundColor: Maybe<Scalars['String']>;
  tracedSVG: Maybe<Scalars['Boolean']>;
  loading: Maybe<Scalars['String']>;
  decoding: Maybe<Scalars['String']>;
  disableBgImageOnAlpha: Maybe<Scalars['Boolean']>;
  disableBgImage: Maybe<Scalars['Boolean']>;
  wrapperStyle: Maybe<Scalars['String']>;
  theme: Maybe<Scalars['String']>;
  vfsRoot: Maybe<Scalars['String']>;
  defaultText: Maybe<Scalars['String']>;
  directory: Maybe<Scalars['String']>;
  html: Maybe<Scalars['String']>;
  target: Maybe<Scalars['String']>;
  icon: Maybe<Scalars['String']>;
  offsetY: Maybe<Scalars['Int']>;
  className: Maybe<Scalars['String']>;
  isTSX: Maybe<Scalars['Boolean']>;
  jsxPragma: Maybe<Scalars['String']>;
  allExtensions: Maybe<Scalars['Boolean']>;
};

export type SitePluginPluginOptionsPluginsPluginOptionsDefaults = {
  formats: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SitePluginPluginOptionsDefaults = {
  formats: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SitePluginPluginOptionsCodegenConfig = {
  avoidOptionals: Maybe<Scalars['Boolean']>;
};

export type SitePluginPluginOptionsSassOptions = {
  includePaths: Maybe<Array<Maybe<Scalars['String']>>>;
  indentedSyntax: Maybe<Scalars['Boolean']>;
  indentType: Maybe<Scalars['String']>;
  indentWidth: Maybe<Scalars['Int']>;
  linefeed: Maybe<Scalars['String']>;
  omitSourceMapUrl: Maybe<Scalars['Boolean']>;
  precision: Maybe<Scalars['Int']>;
  sourceComments: Maybe<Scalars['Boolean']>;
  sourceMapContents: Maybe<Scalars['Boolean']>;
  sourceMapEmbed: Maybe<Scalars['Boolean']>;
};

export type SitePluginPluginOptionsFeeds = {
  query: Maybe<Scalars['String']>;
  output: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type SitePluginPackageJson = {
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  version: Maybe<Scalars['String']>;
  main: Maybe<Scalars['String']>;
  author: Maybe<Scalars['String']>;
  license: Maybe<Scalars['String']>;
  dependencies: Maybe<Array<Maybe<SitePluginPackageJsonDependencies>>>;
  devDependencies: Maybe<Array<Maybe<SitePluginPackageJsonDevDependencies>>>;
  peerDependencies: Maybe<Array<Maybe<SitePluginPackageJsonPeerDependencies>>>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SitePluginPackageJsonDependencies = {
  name: Maybe<Scalars['String']>;
  version: Maybe<Scalars['String']>;
};

export type SitePluginPackageJsonDevDependencies = {
  name: Maybe<Scalars['String']>;
  version: Maybe<Scalars['String']>;
};

export type SitePluginPackageJsonPeerDependencies = {
  name: Maybe<Scalars['String']>;
  version: Maybe<Scalars['String']>;
};

export type SiteBuildMetadata = Node & {
  buildTime: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type SiteBuildMetadataBuildTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};

export type MarkdownHeading = {
  id: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
  depth: Maybe<Scalars['Int']>;
};

export type MarkdownHeadingLevels =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

export type MarkdownExcerptFormats =
  | 'PLAIN'
  | 'HTML'
  | 'MARKDOWN';

export type MarkdownWordCount = {
  paragraphs: Maybe<Scalars['Int']>;
  sentences: Maybe<Scalars['Int']>;
  words: Maybe<Scalars['Int']>;
};

export type MarkdownRemark = Node & {
  id: Scalars['ID'];
  frontmatter: Maybe<MarkdownRemarkFrontmatter>;
  excerpt: Maybe<Scalars['String']>;
  rawMarkdownBody: Maybe<Scalars['String']>;
  fileAbsolutePath: Maybe<Scalars['String']>;
  html: Maybe<Scalars['String']>;
  htmlAst: Maybe<Scalars['JSON']>;
  excerptAst: Maybe<Scalars['JSON']>;
  headings: Maybe<Array<Maybe<MarkdownHeading>>>;
  timeToRead: Maybe<Scalars['Int']>;
  tableOfContents: Maybe<Scalars['String']>;
  wordCount: Maybe<MarkdownWordCount>;
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type MarkdownRemarkExcerptArgs = {
  pruneLength?: Maybe<Scalars['Int']>;
  truncate?: Maybe<Scalars['Boolean']>;
  format?: Maybe<MarkdownExcerptFormats>;
};


export type MarkdownRemarkExcerptAstArgs = {
  pruneLength?: Maybe<Scalars['Int']>;
  truncate?: Maybe<Scalars['Boolean']>;
};


export type MarkdownRemarkHeadingsArgs = {
  depth: Maybe<MarkdownHeadingLevels>;
};


export type MarkdownRemarkTableOfContentsArgs = {
  absolute?: Maybe<Scalars['Boolean']>;
  pathToSlugField?: Maybe<Scalars['String']>;
  maxDepth: Maybe<Scalars['Int']>;
  heading: Maybe<Scalars['String']>;
};

export type MarkdownRemarkFrontmatter = {
  title: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  published: Maybe<Scalars['Date']>;
  modified: Maybe<Scalars['String']>;
  thumbnail: Maybe<File>;
  slug: Maybe<Scalars['String']>;
  tags: Maybe<Array<Maybe<Scalars['String']>>>;
  recommended: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MarkdownRemarkFrontmatterPublishedArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type GatsbyImageFormat =
  | 'NO_CHANGE'
  | 'AUTO'
  | 'JPG'
  | 'PNG'
  | 'WEBP'
  | 'AVIF';

export type GatsbyImageLayout =
  | 'FIXED'
  | 'FULL_WIDTH'
  | 'CONSTRAINED';

export type GatsbyImagePlaceholder =
  | 'DOMINANT_COLOR'
  | 'TRACED_SVG'
  | 'BLURRED'
  | 'NONE';

export type ImageFormat =
  | 'NO_CHANGE'
  | 'AUTO'
  | 'JPG'
  | 'PNG'
  | 'WEBP'
  | 'AVIF';

export type ImageFit =
  | 'COVER'
  | 'CONTAIN'
  | 'FILL'
  | 'INSIDE'
  | 'OUTSIDE';

export type ImageLayout =
  | 'FIXED'
  | 'FULL_WIDTH'
  | 'CONSTRAINED';

export type ImageCropFocus =
  | 'CENTER'
  | 'NORTH'
  | 'NORTHEAST'
  | 'EAST'
  | 'SOUTHEAST'
  | 'SOUTH'
  | 'SOUTHWEST'
  | 'WEST'
  | 'NORTHWEST'
  | 'ENTROPY'
  | 'ATTENTION';

export type DuotoneGradient = {
  highlight: Scalars['String'];
  shadow: Scalars['String'];
  opacity: Maybe<Scalars['Int']>;
};

export type PotraceTurnPolicy =
  | 'TURNPOLICY_BLACK'
  | 'TURNPOLICY_WHITE'
  | 'TURNPOLICY_LEFT'
  | 'TURNPOLICY_RIGHT'
  | 'TURNPOLICY_MINORITY'
  | 'TURNPOLICY_MAJORITY';

export type Potrace = {
  turnPolicy: Maybe<PotraceTurnPolicy>;
  turdSize: Maybe<Scalars['Float']>;
  alphaMax: Maybe<Scalars['Float']>;
  optCurve: Maybe<Scalars['Boolean']>;
  optTolerance: Maybe<Scalars['Float']>;
  threshold: Maybe<Scalars['Int']>;
  blackOnWhite: Maybe<Scalars['Boolean']>;
  color: Maybe<Scalars['String']>;
  background: Maybe<Scalars['String']>;
};

export type ImageSharp = Node & {
  fixed: Maybe<ImageSharpFixed>;
  fluid: Maybe<ImageSharpFluid>;
  gatsbyImageData: Scalars['JSON'];
  original: Maybe<ImageSharpOriginal>;
  resize: Maybe<ImageSharpResize>;
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ImageSharpFixedArgs = {
  width: Maybe<Scalars['Int']>;
  height: Maybe<Scalars['Int']>;
  base64Width: Maybe<Scalars['Int']>;
  jpegProgressive?: Maybe<Scalars['Boolean']>;
  pngCompressionSpeed?: Maybe<Scalars['Int']>;
  grayscale?: Maybe<Scalars['Boolean']>;
  duotone: Maybe<DuotoneGradient>;
  traceSVG: Maybe<Potrace>;
  quality: Maybe<Scalars['Int']>;
  jpegQuality: Maybe<Scalars['Int']>;
  pngQuality: Maybe<Scalars['Int']>;
  webpQuality: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ImageFormat>;
  toFormatBase64?: Maybe<ImageFormat>;
  cropFocus?: Maybe<ImageCropFocus>;
  fit?: Maybe<ImageFit>;
  background?: Maybe<Scalars['String']>;
  rotate?: Maybe<Scalars['Int']>;
  trim?: Maybe<Scalars['Float']>;
};


export type ImageSharpFluidArgs = {
  maxWidth: Maybe<Scalars['Int']>;
  maxHeight: Maybe<Scalars['Int']>;
  base64Width: Maybe<Scalars['Int']>;
  grayscale?: Maybe<Scalars['Boolean']>;
  jpegProgressive?: Maybe<Scalars['Boolean']>;
  pngCompressionSpeed?: Maybe<Scalars['Int']>;
  duotone: Maybe<DuotoneGradient>;
  traceSVG: Maybe<Potrace>;
  quality: Maybe<Scalars['Int']>;
  jpegQuality: Maybe<Scalars['Int']>;
  pngQuality: Maybe<Scalars['Int']>;
  webpQuality: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ImageFormat>;
  toFormatBase64?: Maybe<ImageFormat>;
  cropFocus?: Maybe<ImageCropFocus>;
  fit?: Maybe<ImageFit>;
  background?: Maybe<Scalars['String']>;
  rotate?: Maybe<Scalars['Int']>;
  trim?: Maybe<Scalars['Float']>;
  sizes?: Maybe<Scalars['String']>;
  srcSetBreakpoints?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type ImageSharpGatsbyImageDataArgs = {
  layout?: Maybe<ImageLayout>;
  width: Maybe<Scalars['Int']>;
  height: Maybe<Scalars['Int']>;
  aspectRatio: Maybe<Scalars['Float']>;
  placeholder: Maybe<ImagePlaceholder>;
  blurredOptions: Maybe<BlurredOptions>;
  tracedSVGOptions: Maybe<Potrace>;
  formats: Maybe<Array<Maybe<ImageFormat>>>;
  outputPixelDensities: Maybe<Array<Maybe<Scalars['Float']>>>;
  breakpoints: Maybe<Array<Maybe<Scalars['Int']>>>;
  sizes: Maybe<Scalars['String']>;
  quality: Maybe<Scalars['Int']>;
  jpgOptions: Maybe<JpgOptions>;
  pngOptions: Maybe<PngOptions>;
  webpOptions: Maybe<WebPOptions>;
  avifOptions: Maybe<AvifOptions>;
  transformOptions: Maybe<TransformOptions>;
  backgroundColor: Maybe<Scalars['String']>;
};


export type ImageSharpResizeArgs = {
  width: Maybe<Scalars['Int']>;
  height: Maybe<Scalars['Int']>;
  quality: Maybe<Scalars['Int']>;
  jpegQuality: Maybe<Scalars['Int']>;
  pngQuality: Maybe<Scalars['Int']>;
  webpQuality: Maybe<Scalars['Int']>;
  jpegProgressive?: Maybe<Scalars['Boolean']>;
  pngCompressionLevel?: Maybe<Scalars['Int']>;
  pngCompressionSpeed?: Maybe<Scalars['Int']>;
  grayscale?: Maybe<Scalars['Boolean']>;
  duotone: Maybe<DuotoneGradient>;
  base64?: Maybe<Scalars['Boolean']>;
  traceSVG: Maybe<Potrace>;
  toFormat?: Maybe<ImageFormat>;
  cropFocus?: Maybe<ImageCropFocus>;
  fit?: Maybe<ImageFit>;
  background?: Maybe<Scalars['String']>;
  rotate?: Maybe<Scalars['Int']>;
  trim?: Maybe<Scalars['Float']>;
};

export type ImageSharpFixed = {
  base64: Maybe<Scalars['String']>;
  tracedSVG: Maybe<Scalars['String']>;
  aspectRatio: Maybe<Scalars['Float']>;
  width: Scalars['Float'];
  height: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp: Maybe<Scalars['String']>;
  srcSetWebp: Maybe<Scalars['String']>;
  originalName: Maybe<Scalars['String']>;
};

export type ImageSharpFluid = {
  base64: Maybe<Scalars['String']>;
  tracedSVG: Maybe<Scalars['String']>;
  aspectRatio: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp: Maybe<Scalars['String']>;
  srcSetWebp: Maybe<Scalars['String']>;
  sizes: Scalars['String'];
  originalImg: Maybe<Scalars['String']>;
  originalName: Maybe<Scalars['String']>;
  presentationWidth: Scalars['Int'];
  presentationHeight: Scalars['Int'];
};

export type ImagePlaceholder =
  | 'DOMINANT_COLOR'
  | 'TRACED_SVG'
  | 'BLURRED'
  | 'NONE';

export type BlurredOptions = {
  /** Width of the generated low-res preview. Default is 20px */
  width: Maybe<Scalars['Int']>;
  /** Force the output format for the low-res preview. Default is to use the same format as the input. You should rarely need to change this */
  toFormat: Maybe<ImageFormat>;
};

export type JpgOptions = {
  quality: Maybe<Scalars['Int']>;
  progressive: Maybe<Scalars['Boolean']>;
};

export type PngOptions = {
  quality: Maybe<Scalars['Int']>;
  compressionSpeed: Maybe<Scalars['Int']>;
};

export type WebPOptions = {
  quality: Maybe<Scalars['Int']>;
};

export type AvifOptions = {
  quality: Maybe<Scalars['Int']>;
  lossless: Maybe<Scalars['Boolean']>;
  speed: Maybe<Scalars['Int']>;
};

export type TransformOptions = {
  grayscale: Maybe<Scalars['Boolean']>;
  duotone: Maybe<DuotoneGradient>;
  rotate: Maybe<Scalars['Int']>;
  trim: Maybe<Scalars['Float']>;
  cropFocus: Maybe<ImageCropFocus>;
  fit: Maybe<ImageFit>;
};

export type ImageSharpOriginal = {
  width: Maybe<Scalars['Float']>;
  height: Maybe<Scalars['Float']>;
  src: Maybe<Scalars['String']>;
};

export type ImageSharpResize = {
  src: Maybe<Scalars['String']>;
  tracedSVG: Maybe<Scalars['String']>;
  width: Maybe<Scalars['Int']>;
  height: Maybe<Scalars['Int']>;
  aspectRatio: Maybe<Scalars['Float']>;
  originalName: Maybe<Scalars['String']>;
};

export type MailchimpList = Node & {
  id: Scalars['ID'];
  parent: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  web_id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
  contact: Maybe<MailchimpListContact>;
  permission_reminder: Maybe<Scalars['String']>;
  use_archive_bar: Maybe<Scalars['Boolean']>;
  campaign_defaults: Maybe<MailchimpListCampaign_Defaults>;
  notify_on_subscribe: Maybe<Scalars['String']>;
  notify_on_unsubscribe: Maybe<Scalars['String']>;
  date_created: Maybe<Scalars['Date']>;
  list_rating: Maybe<Scalars['Int']>;
  email_type_option: Maybe<Scalars['Boolean']>;
  subscribe_url_short: Maybe<Scalars['String']>;
  subscribe_url_long: Maybe<Scalars['String']>;
  beamer_address: Maybe<Scalars['String']>;
  visibility: Maybe<Scalars['String']>;
  double_optin: Maybe<Scalars['Boolean']>;
  has_welcome: Maybe<Scalars['Boolean']>;
  marketing_permissions: Maybe<Scalars['Boolean']>;
  stats: Maybe<MailchimpListStats>;
  _links: Maybe<Array<Maybe<MailchimpList_Links>>>;
  statusCode: Maybe<Scalars['Int']>;
};


export type MailchimpListDate_CreatedArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};

export type MailchimpListContact = {
  company: Maybe<Scalars['String']>;
  address1: Maybe<Scalars['String']>;
  address2: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  state: Maybe<Scalars['String']>;
  zip: Maybe<Scalars['String']>;
  country: Maybe<Scalars['String']>;
  phone: Maybe<Scalars['String']>;
};

export type MailchimpListCampaign_Defaults = {
  from_name: Maybe<Scalars['String']>;
  from_email: Maybe<Scalars['String']>;
  subject: Maybe<Scalars['String']>;
  language: Maybe<Scalars['String']>;
};

export type MailchimpListStats = {
  member_count: Maybe<Scalars['Int']>;
  unsubscribe_count: Maybe<Scalars['Int']>;
  cleaned_count: Maybe<Scalars['Int']>;
  member_count_since_send: Maybe<Scalars['Int']>;
  unsubscribe_count_since_send: Maybe<Scalars['Int']>;
  cleaned_count_since_send: Maybe<Scalars['Int']>;
  campaign_count: Maybe<Scalars['Int']>;
  campaign_last_sent: Maybe<Scalars['Date']>;
  merge_field_count: Maybe<Scalars['Int']>;
  avg_sub_rate: Maybe<Scalars['Int']>;
  avg_unsub_rate: Maybe<Scalars['Int']>;
  target_sub_rate: Maybe<Scalars['Int']>;
  open_rate: Maybe<Scalars['Float']>;
  click_rate: Maybe<Scalars['Float']>;
  last_sub_date: Maybe<Scalars['Date']>;
  last_unsub_date: Maybe<Scalars['Date']>;
};


export type MailchimpListStatsCampaign_Last_SentArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type MailchimpListStatsLast_Sub_DateArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


export type MailchimpListStatsLast_Unsub_DateArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};

export type MailchimpList_Links = {
  rel: Maybe<Scalars['String']>;
  href: Maybe<Scalars['String']>;
  method: Maybe<Scalars['String']>;
  targetSchema: Maybe<Scalars['String']>;
  schema: Maybe<Scalars['String']>;
};

export type Query = {
  file: Maybe<File>;
  allFile: FileConnection;
  directory: Maybe<Directory>;
  allDirectory: DirectoryConnection;
  site: Maybe<Site>;
  allSite: SiteConnection;
  siteFunction: Maybe<SiteFunction>;
  allSiteFunction: SiteFunctionConnection;
  sitePage: Maybe<SitePage>;
  allSitePage: SitePageConnection;
  sitePlugin: Maybe<SitePlugin>;
  allSitePlugin: SitePluginConnection;
  siteBuildMetadata: Maybe<SiteBuildMetadata>;
  allSiteBuildMetadata: SiteBuildMetadataConnection;
  markdownRemark: Maybe<MarkdownRemark>;
  allMarkdownRemark: MarkdownRemarkConnection;
  imageSharp: Maybe<ImageSharp>;
  allImageSharp: ImageSharpConnection;
  mailchimpList: Maybe<MailchimpList>;
  allMailchimpList: MailchimpListConnection;
};


export type QueryFileArgs = {
  sourceInstanceName: Maybe<StringQueryOperatorInput>;
  absolutePath: Maybe<StringQueryOperatorInput>;
  relativePath: Maybe<StringQueryOperatorInput>;
  extension: Maybe<StringQueryOperatorInput>;
  size: Maybe<IntQueryOperatorInput>;
  prettySize: Maybe<StringQueryOperatorInput>;
  modifiedTime: Maybe<DateQueryOperatorInput>;
  accessTime: Maybe<DateQueryOperatorInput>;
  changeTime: Maybe<DateQueryOperatorInput>;
  birthTime: Maybe<DateQueryOperatorInput>;
  root: Maybe<StringQueryOperatorInput>;
  dir: Maybe<StringQueryOperatorInput>;
  base: Maybe<StringQueryOperatorInput>;
  ext: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  relativeDirectory: Maybe<StringQueryOperatorInput>;
  dev: Maybe<IntQueryOperatorInput>;
  mode: Maybe<IntQueryOperatorInput>;
  nlink: Maybe<IntQueryOperatorInput>;
  uid: Maybe<IntQueryOperatorInput>;
  gid: Maybe<IntQueryOperatorInput>;
  rdev: Maybe<IntQueryOperatorInput>;
  ino: Maybe<FloatQueryOperatorInput>;
  atimeMs: Maybe<FloatQueryOperatorInput>;
  mtimeMs: Maybe<FloatQueryOperatorInput>;
  ctimeMs: Maybe<FloatQueryOperatorInput>;
  atime: Maybe<DateQueryOperatorInput>;
  mtime: Maybe<DateQueryOperatorInput>;
  ctime: Maybe<DateQueryOperatorInput>;
  birthtime: Maybe<DateQueryOperatorInput>;
  birthtimeMs: Maybe<FloatQueryOperatorInput>;
  blksize: Maybe<IntQueryOperatorInput>;
  blocks: Maybe<IntQueryOperatorInput>;
  publicURL: Maybe<StringQueryOperatorInput>;
  childrenMarkdownRemark: Maybe<MarkdownRemarkFilterListInput>;
  childMarkdownRemark: Maybe<MarkdownRemarkFilterInput>;
  childrenImageSharp: Maybe<ImageSharpFilterListInput>;
  childImageSharp: Maybe<ImageSharpFilterInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


export type QueryAllFileArgs = {
  filter: Maybe<FileFilterInput>;
  sort: Maybe<FileSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QueryDirectoryArgs = {
  sourceInstanceName: Maybe<StringQueryOperatorInput>;
  absolutePath: Maybe<StringQueryOperatorInput>;
  relativePath: Maybe<StringQueryOperatorInput>;
  extension: Maybe<StringQueryOperatorInput>;
  size: Maybe<IntQueryOperatorInput>;
  prettySize: Maybe<StringQueryOperatorInput>;
  modifiedTime: Maybe<DateQueryOperatorInput>;
  accessTime: Maybe<DateQueryOperatorInput>;
  changeTime: Maybe<DateQueryOperatorInput>;
  birthTime: Maybe<DateQueryOperatorInput>;
  root: Maybe<StringQueryOperatorInput>;
  dir: Maybe<StringQueryOperatorInput>;
  base: Maybe<StringQueryOperatorInput>;
  ext: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  relativeDirectory: Maybe<StringQueryOperatorInput>;
  dev: Maybe<IntQueryOperatorInput>;
  mode: Maybe<IntQueryOperatorInput>;
  nlink: Maybe<IntQueryOperatorInput>;
  uid: Maybe<IntQueryOperatorInput>;
  gid: Maybe<IntQueryOperatorInput>;
  rdev: Maybe<IntQueryOperatorInput>;
  ino: Maybe<FloatQueryOperatorInput>;
  atimeMs: Maybe<FloatQueryOperatorInput>;
  mtimeMs: Maybe<FloatQueryOperatorInput>;
  ctimeMs: Maybe<FloatQueryOperatorInput>;
  atime: Maybe<DateQueryOperatorInput>;
  mtime: Maybe<DateQueryOperatorInput>;
  ctime: Maybe<DateQueryOperatorInput>;
  birthtime: Maybe<DateQueryOperatorInput>;
  birthtimeMs: Maybe<FloatQueryOperatorInput>;
  blksize: Maybe<IntQueryOperatorInput>;
  blocks: Maybe<IntQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


export type QueryAllDirectoryArgs = {
  filter: Maybe<DirectoryFilterInput>;
  sort: Maybe<DirectorySortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QuerySiteArgs = {
  buildTime: Maybe<DateQueryOperatorInput>;
  siteMetadata: Maybe<SiteSiteMetadataFilterInput>;
  port: Maybe<IntQueryOperatorInput>;
  host: Maybe<StringQueryOperatorInput>;
  pathPrefix: Maybe<StringQueryOperatorInput>;
  flags: Maybe<SiteFlagsFilterInput>;
  polyfill: Maybe<BooleanQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


export type QueryAllSiteArgs = {
  filter: Maybe<SiteFilterInput>;
  sort: Maybe<SiteSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QuerySiteFunctionArgs = {
  functionRoute: Maybe<StringQueryOperatorInput>;
  pluginName: Maybe<StringQueryOperatorInput>;
  originalAbsoluteFilePath: Maybe<StringQueryOperatorInput>;
  originalRelativeFilePath: Maybe<StringQueryOperatorInput>;
  relativeCompiledFilePath: Maybe<StringQueryOperatorInput>;
  absoluteCompiledFilePath: Maybe<StringQueryOperatorInput>;
  matchPath: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


export type QueryAllSiteFunctionArgs = {
  filter: Maybe<SiteFunctionFilterInput>;
  sort: Maybe<SiteFunctionSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QuerySitePageArgs = {
  path: Maybe<StringQueryOperatorInput>;
  component: Maybe<StringQueryOperatorInput>;
  internalComponentName: Maybe<StringQueryOperatorInput>;
  componentChunkName: Maybe<StringQueryOperatorInput>;
  matchPath: Maybe<StringQueryOperatorInput>;
  isCreatedByStatefulCreatePages: Maybe<BooleanQueryOperatorInput>;
  pluginCreator: Maybe<SitePluginFilterInput>;
  pluginCreatorId: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  context: Maybe<SitePageContextFilterInput>;
};


export type QueryAllSitePageArgs = {
  filter: Maybe<SitePageFilterInput>;
  sort: Maybe<SitePageSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QuerySitePluginArgs = {
  resolve: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  version: Maybe<StringQueryOperatorInput>;
  nodeAPIs: Maybe<StringQueryOperatorInput>;
  browserAPIs: Maybe<StringQueryOperatorInput>;
  ssrAPIs: Maybe<StringQueryOperatorInput>;
  pluginFilepath: Maybe<StringQueryOperatorInput>;
  pluginOptions: Maybe<SitePluginPluginOptionsFilterInput>;
  packageJson: Maybe<SitePluginPackageJsonFilterInput>;
  subPluginPaths: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


export type QueryAllSitePluginArgs = {
  filter: Maybe<SitePluginFilterInput>;
  sort: Maybe<SitePluginSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QuerySiteBuildMetadataArgs = {
  buildTime: Maybe<DateQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


export type QueryAllSiteBuildMetadataArgs = {
  filter: Maybe<SiteBuildMetadataFilterInput>;
  sort: Maybe<SiteBuildMetadataSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QueryMarkdownRemarkArgs = {
  id: Maybe<StringQueryOperatorInput>;
  frontmatter: Maybe<MarkdownRemarkFrontmatterFilterInput>;
  excerpt: Maybe<StringQueryOperatorInput>;
  rawMarkdownBody: Maybe<StringQueryOperatorInput>;
  fileAbsolutePath: Maybe<StringQueryOperatorInput>;
  html: Maybe<StringQueryOperatorInput>;
  htmlAst: Maybe<JsonQueryOperatorInput>;
  excerptAst: Maybe<JsonQueryOperatorInput>;
  headings: Maybe<MarkdownHeadingFilterListInput>;
  timeToRead: Maybe<IntQueryOperatorInput>;
  tableOfContents: Maybe<StringQueryOperatorInput>;
  wordCount: Maybe<MarkdownWordCountFilterInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


export type QueryAllMarkdownRemarkArgs = {
  filter: Maybe<MarkdownRemarkFilterInput>;
  sort: Maybe<MarkdownRemarkSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QueryImageSharpArgs = {
  fixed: Maybe<ImageSharpFixedFilterInput>;
  fluid: Maybe<ImageSharpFluidFilterInput>;
  gatsbyImageData: Maybe<JsonQueryOperatorInput>;
  original: Maybe<ImageSharpOriginalFilterInput>;
  resize: Maybe<ImageSharpResizeFilterInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


export type QueryAllImageSharpArgs = {
  filter: Maybe<ImageSharpFilterInput>;
  sort: Maybe<ImageSharpSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


export type QueryMailchimpListArgs = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  web_id: Maybe<IntQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  contact: Maybe<MailchimpListContactFilterInput>;
  permission_reminder: Maybe<StringQueryOperatorInput>;
  use_archive_bar: Maybe<BooleanQueryOperatorInput>;
  campaign_defaults: Maybe<MailchimpListCampaign_DefaultsFilterInput>;
  notify_on_subscribe: Maybe<StringQueryOperatorInput>;
  notify_on_unsubscribe: Maybe<StringQueryOperatorInput>;
  date_created: Maybe<DateQueryOperatorInput>;
  list_rating: Maybe<IntQueryOperatorInput>;
  email_type_option: Maybe<BooleanQueryOperatorInput>;
  subscribe_url_short: Maybe<StringQueryOperatorInput>;
  subscribe_url_long: Maybe<StringQueryOperatorInput>;
  beamer_address: Maybe<StringQueryOperatorInput>;
  visibility: Maybe<StringQueryOperatorInput>;
  double_optin: Maybe<BooleanQueryOperatorInput>;
  has_welcome: Maybe<BooleanQueryOperatorInput>;
  marketing_permissions: Maybe<BooleanQueryOperatorInput>;
  stats: Maybe<MailchimpListStatsFilterInput>;
  _links: Maybe<MailchimpList_LinksFilterListInput>;
  statusCode: Maybe<IntQueryOperatorInput>;
};


export type QueryAllMailchimpListArgs = {
  filter: Maybe<MailchimpListFilterInput>;
  sort: Maybe<MailchimpListSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};

export type StringQueryOperatorInput = {
  eq: Maybe<Scalars['String']>;
  ne: Maybe<Scalars['String']>;
  in: Maybe<Array<Maybe<Scalars['String']>>>;
  nin: Maybe<Array<Maybe<Scalars['String']>>>;
  regex: Maybe<Scalars['String']>;
  glob: Maybe<Scalars['String']>;
};

export type IntQueryOperatorInput = {
  eq: Maybe<Scalars['Int']>;
  ne: Maybe<Scalars['Int']>;
  gt: Maybe<Scalars['Int']>;
  gte: Maybe<Scalars['Int']>;
  lt: Maybe<Scalars['Int']>;
  lte: Maybe<Scalars['Int']>;
  in: Maybe<Array<Maybe<Scalars['Int']>>>;
  nin: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type DateQueryOperatorInput = {
  eq: Maybe<Scalars['Date']>;
  ne: Maybe<Scalars['Date']>;
  gt: Maybe<Scalars['Date']>;
  gte: Maybe<Scalars['Date']>;
  lt: Maybe<Scalars['Date']>;
  lte: Maybe<Scalars['Date']>;
  in: Maybe<Array<Maybe<Scalars['Date']>>>;
  nin: Maybe<Array<Maybe<Scalars['Date']>>>;
};

export type FloatQueryOperatorInput = {
  eq: Maybe<Scalars['Float']>;
  ne: Maybe<Scalars['Float']>;
  gt: Maybe<Scalars['Float']>;
  gte: Maybe<Scalars['Float']>;
  lt: Maybe<Scalars['Float']>;
  lte: Maybe<Scalars['Float']>;
  in: Maybe<Array<Maybe<Scalars['Float']>>>;
  nin: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export type MarkdownRemarkFilterListInput = {
  elemMatch: Maybe<MarkdownRemarkFilterInput>;
};

export type MarkdownRemarkFilterInput = {
  id: Maybe<StringQueryOperatorInput>;
  frontmatter: Maybe<MarkdownRemarkFrontmatterFilterInput>;
  excerpt: Maybe<StringQueryOperatorInput>;
  rawMarkdownBody: Maybe<StringQueryOperatorInput>;
  fileAbsolutePath: Maybe<StringQueryOperatorInput>;
  html: Maybe<StringQueryOperatorInput>;
  htmlAst: Maybe<JsonQueryOperatorInput>;
  excerptAst: Maybe<JsonQueryOperatorInput>;
  headings: Maybe<MarkdownHeadingFilterListInput>;
  timeToRead: Maybe<IntQueryOperatorInput>;
  tableOfContents: Maybe<StringQueryOperatorInput>;
  wordCount: Maybe<MarkdownWordCountFilterInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type MarkdownRemarkFrontmatterFilterInput = {
  title: Maybe<StringQueryOperatorInput>;
  type: Maybe<StringQueryOperatorInput>;
  description: Maybe<StringQueryOperatorInput>;
  published: Maybe<DateQueryOperatorInput>;
  modified: Maybe<StringQueryOperatorInput>;
  thumbnail: Maybe<FileFilterInput>;
  slug: Maybe<StringQueryOperatorInput>;
  tags: Maybe<StringQueryOperatorInput>;
  recommended: Maybe<StringQueryOperatorInput>;
};

export type FileFilterInput = {
  sourceInstanceName: Maybe<StringQueryOperatorInput>;
  absolutePath: Maybe<StringQueryOperatorInput>;
  relativePath: Maybe<StringQueryOperatorInput>;
  extension: Maybe<StringQueryOperatorInput>;
  size: Maybe<IntQueryOperatorInput>;
  prettySize: Maybe<StringQueryOperatorInput>;
  modifiedTime: Maybe<DateQueryOperatorInput>;
  accessTime: Maybe<DateQueryOperatorInput>;
  changeTime: Maybe<DateQueryOperatorInput>;
  birthTime: Maybe<DateQueryOperatorInput>;
  root: Maybe<StringQueryOperatorInput>;
  dir: Maybe<StringQueryOperatorInput>;
  base: Maybe<StringQueryOperatorInput>;
  ext: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  relativeDirectory: Maybe<StringQueryOperatorInput>;
  dev: Maybe<IntQueryOperatorInput>;
  mode: Maybe<IntQueryOperatorInput>;
  nlink: Maybe<IntQueryOperatorInput>;
  uid: Maybe<IntQueryOperatorInput>;
  gid: Maybe<IntQueryOperatorInput>;
  rdev: Maybe<IntQueryOperatorInput>;
  ino: Maybe<FloatQueryOperatorInput>;
  atimeMs: Maybe<FloatQueryOperatorInput>;
  mtimeMs: Maybe<FloatQueryOperatorInput>;
  ctimeMs: Maybe<FloatQueryOperatorInput>;
  atime: Maybe<DateQueryOperatorInput>;
  mtime: Maybe<DateQueryOperatorInput>;
  ctime: Maybe<DateQueryOperatorInput>;
  birthtime: Maybe<DateQueryOperatorInput>;
  birthtimeMs: Maybe<FloatQueryOperatorInput>;
  blksize: Maybe<IntQueryOperatorInput>;
  blocks: Maybe<IntQueryOperatorInput>;
  publicURL: Maybe<StringQueryOperatorInput>;
  childrenMarkdownRemark: Maybe<MarkdownRemarkFilterListInput>;
  childMarkdownRemark: Maybe<MarkdownRemarkFilterInput>;
  childrenImageSharp: Maybe<ImageSharpFilterListInput>;
  childImageSharp: Maybe<ImageSharpFilterInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type ImageSharpFilterListInput = {
  elemMatch: Maybe<ImageSharpFilterInput>;
};

export type ImageSharpFilterInput = {
  fixed: Maybe<ImageSharpFixedFilterInput>;
  fluid: Maybe<ImageSharpFluidFilterInput>;
  gatsbyImageData: Maybe<JsonQueryOperatorInput>;
  original: Maybe<ImageSharpOriginalFilterInput>;
  resize: Maybe<ImageSharpResizeFilterInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type ImageSharpFixedFilterInput = {
  base64: Maybe<StringQueryOperatorInput>;
  tracedSVG: Maybe<StringQueryOperatorInput>;
  aspectRatio: Maybe<FloatQueryOperatorInput>;
  width: Maybe<FloatQueryOperatorInput>;
  height: Maybe<FloatQueryOperatorInput>;
  src: Maybe<StringQueryOperatorInput>;
  srcSet: Maybe<StringQueryOperatorInput>;
  srcWebp: Maybe<StringQueryOperatorInput>;
  srcSetWebp: Maybe<StringQueryOperatorInput>;
  originalName: Maybe<StringQueryOperatorInput>;
};

export type ImageSharpFluidFilterInput = {
  base64: Maybe<StringQueryOperatorInput>;
  tracedSVG: Maybe<StringQueryOperatorInput>;
  aspectRatio: Maybe<FloatQueryOperatorInput>;
  src: Maybe<StringQueryOperatorInput>;
  srcSet: Maybe<StringQueryOperatorInput>;
  srcWebp: Maybe<StringQueryOperatorInput>;
  srcSetWebp: Maybe<StringQueryOperatorInput>;
  sizes: Maybe<StringQueryOperatorInput>;
  originalImg: Maybe<StringQueryOperatorInput>;
  originalName: Maybe<StringQueryOperatorInput>;
  presentationWidth: Maybe<IntQueryOperatorInput>;
  presentationHeight: Maybe<IntQueryOperatorInput>;
};

export type JsonQueryOperatorInput = {
  eq: Maybe<Scalars['JSON']>;
  ne: Maybe<Scalars['JSON']>;
  in: Maybe<Array<Maybe<Scalars['JSON']>>>;
  nin: Maybe<Array<Maybe<Scalars['JSON']>>>;
  regex: Maybe<Scalars['JSON']>;
  glob: Maybe<Scalars['JSON']>;
};

export type ImageSharpOriginalFilterInput = {
  width: Maybe<FloatQueryOperatorInput>;
  height: Maybe<FloatQueryOperatorInput>;
  src: Maybe<StringQueryOperatorInput>;
};

export type ImageSharpResizeFilterInput = {
  src: Maybe<StringQueryOperatorInput>;
  tracedSVG: Maybe<StringQueryOperatorInput>;
  width: Maybe<IntQueryOperatorInput>;
  height: Maybe<IntQueryOperatorInput>;
  aspectRatio: Maybe<FloatQueryOperatorInput>;
  originalName: Maybe<StringQueryOperatorInput>;
};

export type NodeFilterInput = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type NodeFilterListInput = {
  elemMatch: Maybe<NodeFilterInput>;
};

export type InternalFilterInput = {
  content: Maybe<StringQueryOperatorInput>;
  contentDigest: Maybe<StringQueryOperatorInput>;
  description: Maybe<StringQueryOperatorInput>;
  fieldOwners: Maybe<StringQueryOperatorInput>;
  ignoreType: Maybe<BooleanQueryOperatorInput>;
  mediaType: Maybe<StringQueryOperatorInput>;
  owner: Maybe<StringQueryOperatorInput>;
  type: Maybe<StringQueryOperatorInput>;
};

export type BooleanQueryOperatorInput = {
  eq: Maybe<Scalars['Boolean']>;
  ne: Maybe<Scalars['Boolean']>;
  in: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  nin: Maybe<Array<Maybe<Scalars['Boolean']>>>;
};

export type MarkdownHeadingFilterListInput = {
  elemMatch: Maybe<MarkdownHeadingFilterInput>;
};

export type MarkdownHeadingFilterInput = {
  id: Maybe<StringQueryOperatorInput>;
  value: Maybe<StringQueryOperatorInput>;
  depth: Maybe<IntQueryOperatorInput>;
};

export type MarkdownWordCountFilterInput = {
  paragraphs: Maybe<IntQueryOperatorInput>;
  sentences: Maybe<IntQueryOperatorInput>;
  words: Maybe<IntQueryOperatorInput>;
};

export type FileConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileEdge>;
  nodes: Array<File>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<FileGroupConnection>;
};


export type FileConnectionDistinctArgs = {
  field: FileFieldsEnum;
};


export type FileConnectionMaxArgs = {
  field: FileFieldsEnum;
};


export type FileConnectionMinArgs = {
  field: FileFieldsEnum;
};


export type FileConnectionSumArgs = {
  field: FileFieldsEnum;
};


export type FileConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: FileFieldsEnum;
};

export type FileEdge = {
  next: Maybe<File>;
  node: File;
  previous: Maybe<File>;
};

export type PageInfo = {
  currentPage: Scalars['Int'];
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  itemCount: Scalars['Int'];
  pageCount: Scalars['Int'];
  perPage: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type FileFieldsEnum =
  | 'sourceInstanceName'
  | 'absolutePath'
  | 'relativePath'
  | 'extension'
  | 'size'
  | 'prettySize'
  | 'modifiedTime'
  | 'accessTime'
  | 'changeTime'
  | 'birthTime'
  | 'root'
  | 'dir'
  | 'base'
  | 'ext'
  | 'name'
  | 'relativeDirectory'
  | 'dev'
  | 'mode'
  | 'nlink'
  | 'uid'
  | 'gid'
  | 'rdev'
  | 'ino'
  | 'atimeMs'
  | 'mtimeMs'
  | 'ctimeMs'
  | 'atime'
  | 'mtime'
  | 'ctime'
  | 'birthtime'
  | 'birthtimeMs'
  | 'blksize'
  | 'blocks'
  | 'publicURL'
  | 'childrenMarkdownRemark'
  | 'childrenMarkdownRemark___id'
  | 'childrenMarkdownRemark___frontmatter___title'
  | 'childrenMarkdownRemark___frontmatter___type'
  | 'childrenMarkdownRemark___frontmatter___description'
  | 'childrenMarkdownRemark___frontmatter___published'
  | 'childrenMarkdownRemark___frontmatter___modified'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___sourceInstanceName'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___absolutePath'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___relativePath'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___extension'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___size'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___prettySize'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___modifiedTime'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___accessTime'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___changeTime'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___birthTime'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___root'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___dir'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___base'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___ext'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___name'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___relativeDirectory'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___dev'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___mode'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___nlink'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___uid'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___gid'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___rdev'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___ino'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___atimeMs'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___mtimeMs'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___ctimeMs'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___atime'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___mtime'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___ctime'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___birthtime'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___birthtimeMs'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___blksize'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___blocks'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___publicURL'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___childrenMarkdownRemark'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___childrenImageSharp'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___id'
  | 'childrenMarkdownRemark___frontmatter___thumbnail___children'
  | 'childrenMarkdownRemark___frontmatter___slug'
  | 'childrenMarkdownRemark___frontmatter___tags'
  | 'childrenMarkdownRemark___frontmatter___recommended'
  | 'childrenMarkdownRemark___excerpt'
  | 'childrenMarkdownRemark___rawMarkdownBody'
  | 'childrenMarkdownRemark___fileAbsolutePath'
  | 'childrenMarkdownRemark___html'
  | 'childrenMarkdownRemark___htmlAst'
  | 'childrenMarkdownRemark___excerptAst'
  | 'childrenMarkdownRemark___headings'
  | 'childrenMarkdownRemark___headings___id'
  | 'childrenMarkdownRemark___headings___value'
  | 'childrenMarkdownRemark___headings___depth'
  | 'childrenMarkdownRemark___timeToRead'
  | 'childrenMarkdownRemark___tableOfContents'
  | 'childrenMarkdownRemark___wordCount___paragraphs'
  | 'childrenMarkdownRemark___wordCount___sentences'
  | 'childrenMarkdownRemark___wordCount___words'
  | 'childrenMarkdownRemark___parent___id'
  | 'childrenMarkdownRemark___parent___parent___id'
  | 'childrenMarkdownRemark___parent___parent___children'
  | 'childrenMarkdownRemark___parent___children'
  | 'childrenMarkdownRemark___parent___children___id'
  | 'childrenMarkdownRemark___parent___children___children'
  | 'childrenMarkdownRemark___parent___internal___content'
  | 'childrenMarkdownRemark___parent___internal___contentDigest'
  | 'childrenMarkdownRemark___parent___internal___description'
  | 'childrenMarkdownRemark___parent___internal___fieldOwners'
  | 'childrenMarkdownRemark___parent___internal___ignoreType'
  | 'childrenMarkdownRemark___parent___internal___mediaType'
  | 'childrenMarkdownRemark___parent___internal___owner'
  | 'childrenMarkdownRemark___parent___internal___type'
  | 'childrenMarkdownRemark___children'
  | 'childrenMarkdownRemark___children___id'
  | 'childrenMarkdownRemark___children___parent___id'
  | 'childrenMarkdownRemark___children___parent___children'
  | 'childrenMarkdownRemark___children___children'
  | 'childrenMarkdownRemark___children___children___id'
  | 'childrenMarkdownRemark___children___children___children'
  | 'childrenMarkdownRemark___children___internal___content'
  | 'childrenMarkdownRemark___children___internal___contentDigest'
  | 'childrenMarkdownRemark___children___internal___description'
  | 'childrenMarkdownRemark___children___internal___fieldOwners'
  | 'childrenMarkdownRemark___children___internal___ignoreType'
  | 'childrenMarkdownRemark___children___internal___mediaType'
  | 'childrenMarkdownRemark___children___internal___owner'
  | 'childrenMarkdownRemark___children___internal___type'
  | 'childrenMarkdownRemark___internal___content'
  | 'childrenMarkdownRemark___internal___contentDigest'
  | 'childrenMarkdownRemark___internal___description'
  | 'childrenMarkdownRemark___internal___fieldOwners'
  | 'childrenMarkdownRemark___internal___ignoreType'
  | 'childrenMarkdownRemark___internal___mediaType'
  | 'childrenMarkdownRemark___internal___owner'
  | 'childrenMarkdownRemark___internal___type'
  | 'childMarkdownRemark___id'
  | 'childMarkdownRemark___frontmatter___title'
  | 'childMarkdownRemark___frontmatter___type'
  | 'childMarkdownRemark___frontmatter___description'
  | 'childMarkdownRemark___frontmatter___published'
  | 'childMarkdownRemark___frontmatter___modified'
  | 'childMarkdownRemark___frontmatter___thumbnail___sourceInstanceName'
  | 'childMarkdownRemark___frontmatter___thumbnail___absolutePath'
  | 'childMarkdownRemark___frontmatter___thumbnail___relativePath'
  | 'childMarkdownRemark___frontmatter___thumbnail___extension'
  | 'childMarkdownRemark___frontmatter___thumbnail___size'
  | 'childMarkdownRemark___frontmatter___thumbnail___prettySize'
  | 'childMarkdownRemark___frontmatter___thumbnail___modifiedTime'
  | 'childMarkdownRemark___frontmatter___thumbnail___accessTime'
  | 'childMarkdownRemark___frontmatter___thumbnail___changeTime'
  | 'childMarkdownRemark___frontmatter___thumbnail___birthTime'
  | 'childMarkdownRemark___frontmatter___thumbnail___root'
  | 'childMarkdownRemark___frontmatter___thumbnail___dir'
  | 'childMarkdownRemark___frontmatter___thumbnail___base'
  | 'childMarkdownRemark___frontmatter___thumbnail___ext'
  | 'childMarkdownRemark___frontmatter___thumbnail___name'
  | 'childMarkdownRemark___frontmatter___thumbnail___relativeDirectory'
  | 'childMarkdownRemark___frontmatter___thumbnail___dev'
  | 'childMarkdownRemark___frontmatter___thumbnail___mode'
  | 'childMarkdownRemark___frontmatter___thumbnail___nlink'
  | 'childMarkdownRemark___frontmatter___thumbnail___uid'
  | 'childMarkdownRemark___frontmatter___thumbnail___gid'
  | 'childMarkdownRemark___frontmatter___thumbnail___rdev'
  | 'childMarkdownRemark___frontmatter___thumbnail___ino'
  | 'childMarkdownRemark___frontmatter___thumbnail___atimeMs'
  | 'childMarkdownRemark___frontmatter___thumbnail___mtimeMs'
  | 'childMarkdownRemark___frontmatter___thumbnail___ctimeMs'
  | 'childMarkdownRemark___frontmatter___thumbnail___atime'
  | 'childMarkdownRemark___frontmatter___thumbnail___mtime'
  | 'childMarkdownRemark___frontmatter___thumbnail___ctime'
  | 'childMarkdownRemark___frontmatter___thumbnail___birthtime'
  | 'childMarkdownRemark___frontmatter___thumbnail___birthtimeMs'
  | 'childMarkdownRemark___frontmatter___thumbnail___blksize'
  | 'childMarkdownRemark___frontmatter___thumbnail___blocks'
  | 'childMarkdownRemark___frontmatter___thumbnail___publicURL'
  | 'childMarkdownRemark___frontmatter___thumbnail___childrenMarkdownRemark'
  | 'childMarkdownRemark___frontmatter___thumbnail___childrenImageSharp'
  | 'childMarkdownRemark___frontmatter___thumbnail___id'
  | 'childMarkdownRemark___frontmatter___thumbnail___children'
  | 'childMarkdownRemark___frontmatter___slug'
  | 'childMarkdownRemark___frontmatter___tags'
  | 'childMarkdownRemark___frontmatter___recommended'
  | 'childMarkdownRemark___excerpt'
  | 'childMarkdownRemark___rawMarkdownBody'
  | 'childMarkdownRemark___fileAbsolutePath'
  | 'childMarkdownRemark___html'
  | 'childMarkdownRemark___htmlAst'
  | 'childMarkdownRemark___excerptAst'
  | 'childMarkdownRemark___headings'
  | 'childMarkdownRemark___headings___id'
  | 'childMarkdownRemark___headings___value'
  | 'childMarkdownRemark___headings___depth'
  | 'childMarkdownRemark___timeToRead'
  | 'childMarkdownRemark___tableOfContents'
  | 'childMarkdownRemark___wordCount___paragraphs'
  | 'childMarkdownRemark___wordCount___sentences'
  | 'childMarkdownRemark___wordCount___words'
  | 'childMarkdownRemark___parent___id'
  | 'childMarkdownRemark___parent___parent___id'
  | 'childMarkdownRemark___parent___parent___children'
  | 'childMarkdownRemark___parent___children'
  | 'childMarkdownRemark___parent___children___id'
  | 'childMarkdownRemark___parent___children___children'
  | 'childMarkdownRemark___parent___internal___content'
  | 'childMarkdownRemark___parent___internal___contentDigest'
  | 'childMarkdownRemark___parent___internal___description'
  | 'childMarkdownRemark___parent___internal___fieldOwners'
  | 'childMarkdownRemark___parent___internal___ignoreType'
  | 'childMarkdownRemark___parent___internal___mediaType'
  | 'childMarkdownRemark___parent___internal___owner'
  | 'childMarkdownRemark___parent___internal___type'
  | 'childMarkdownRemark___children'
  | 'childMarkdownRemark___children___id'
  | 'childMarkdownRemark___children___parent___id'
  | 'childMarkdownRemark___children___parent___children'
  | 'childMarkdownRemark___children___children'
  | 'childMarkdownRemark___children___children___id'
  | 'childMarkdownRemark___children___children___children'
  | 'childMarkdownRemark___children___internal___content'
  | 'childMarkdownRemark___children___internal___contentDigest'
  | 'childMarkdownRemark___children___internal___description'
  | 'childMarkdownRemark___children___internal___fieldOwners'
  | 'childMarkdownRemark___children___internal___ignoreType'
  | 'childMarkdownRemark___children___internal___mediaType'
  | 'childMarkdownRemark___children___internal___owner'
  | 'childMarkdownRemark___children___internal___type'
  | 'childMarkdownRemark___internal___content'
  | 'childMarkdownRemark___internal___contentDigest'
  | 'childMarkdownRemark___internal___description'
  | 'childMarkdownRemark___internal___fieldOwners'
  | 'childMarkdownRemark___internal___ignoreType'
  | 'childMarkdownRemark___internal___mediaType'
  | 'childMarkdownRemark___internal___owner'
  | 'childMarkdownRemark___internal___type'
  | 'childrenImageSharp'
  | 'childrenImageSharp___fixed___base64'
  | 'childrenImageSharp___fixed___tracedSVG'
  | 'childrenImageSharp___fixed___aspectRatio'
  | 'childrenImageSharp___fixed___width'
  | 'childrenImageSharp___fixed___height'
  | 'childrenImageSharp___fixed___src'
  | 'childrenImageSharp___fixed___srcSet'
  | 'childrenImageSharp___fixed___srcWebp'
  | 'childrenImageSharp___fixed___srcSetWebp'
  | 'childrenImageSharp___fixed___originalName'
  | 'childrenImageSharp___fluid___base64'
  | 'childrenImageSharp___fluid___tracedSVG'
  | 'childrenImageSharp___fluid___aspectRatio'
  | 'childrenImageSharp___fluid___src'
  | 'childrenImageSharp___fluid___srcSet'
  | 'childrenImageSharp___fluid___srcWebp'
  | 'childrenImageSharp___fluid___srcSetWebp'
  | 'childrenImageSharp___fluid___sizes'
  | 'childrenImageSharp___fluid___originalImg'
  | 'childrenImageSharp___fluid___originalName'
  | 'childrenImageSharp___fluid___presentationWidth'
  | 'childrenImageSharp___fluid___presentationHeight'
  | 'childrenImageSharp___gatsbyImageData'
  | 'childrenImageSharp___original___width'
  | 'childrenImageSharp___original___height'
  | 'childrenImageSharp___original___src'
  | 'childrenImageSharp___resize___src'
  | 'childrenImageSharp___resize___tracedSVG'
  | 'childrenImageSharp___resize___width'
  | 'childrenImageSharp___resize___height'
  | 'childrenImageSharp___resize___aspectRatio'
  | 'childrenImageSharp___resize___originalName'
  | 'childrenImageSharp___id'
  | 'childrenImageSharp___parent___id'
  | 'childrenImageSharp___parent___parent___id'
  | 'childrenImageSharp___parent___parent___children'
  | 'childrenImageSharp___parent___children'
  | 'childrenImageSharp___parent___children___id'
  | 'childrenImageSharp___parent___children___children'
  | 'childrenImageSharp___parent___internal___content'
  | 'childrenImageSharp___parent___internal___contentDigest'
  | 'childrenImageSharp___parent___internal___description'
  | 'childrenImageSharp___parent___internal___fieldOwners'
  | 'childrenImageSharp___parent___internal___ignoreType'
  | 'childrenImageSharp___parent___internal___mediaType'
  | 'childrenImageSharp___parent___internal___owner'
  | 'childrenImageSharp___parent___internal___type'
  | 'childrenImageSharp___children'
  | 'childrenImageSharp___children___id'
  | 'childrenImageSharp___children___parent___id'
  | 'childrenImageSharp___children___parent___children'
  | 'childrenImageSharp___children___children'
  | 'childrenImageSharp___children___children___id'
  | 'childrenImageSharp___children___children___children'
  | 'childrenImageSharp___children___internal___content'
  | 'childrenImageSharp___children___internal___contentDigest'
  | 'childrenImageSharp___children___internal___description'
  | 'childrenImageSharp___children___internal___fieldOwners'
  | 'childrenImageSharp___children___internal___ignoreType'
  | 'childrenImageSharp___children___internal___mediaType'
  | 'childrenImageSharp___children___internal___owner'
  | 'childrenImageSharp___children___internal___type'
  | 'childrenImageSharp___internal___content'
  | 'childrenImageSharp___internal___contentDigest'
  | 'childrenImageSharp___internal___description'
  | 'childrenImageSharp___internal___fieldOwners'
  | 'childrenImageSharp___internal___ignoreType'
  | 'childrenImageSharp___internal___mediaType'
  | 'childrenImageSharp___internal___owner'
  | 'childrenImageSharp___internal___type'
  | 'childImageSharp___fixed___base64'
  | 'childImageSharp___fixed___tracedSVG'
  | 'childImageSharp___fixed___aspectRatio'
  | 'childImageSharp___fixed___width'
  | 'childImageSharp___fixed___height'
  | 'childImageSharp___fixed___src'
  | 'childImageSharp___fixed___srcSet'
  | 'childImageSharp___fixed___srcWebp'
  | 'childImageSharp___fixed___srcSetWebp'
  | 'childImageSharp___fixed___originalName'
  | 'childImageSharp___fluid___base64'
  | 'childImageSharp___fluid___tracedSVG'
  | 'childImageSharp___fluid___aspectRatio'
  | 'childImageSharp___fluid___src'
  | 'childImageSharp___fluid___srcSet'
  | 'childImageSharp___fluid___srcWebp'
  | 'childImageSharp___fluid___srcSetWebp'
  | 'childImageSharp___fluid___sizes'
  | 'childImageSharp___fluid___originalImg'
  | 'childImageSharp___fluid___originalName'
  | 'childImageSharp___fluid___presentationWidth'
  | 'childImageSharp___fluid___presentationHeight'
  | 'childImageSharp___gatsbyImageData'
  | 'childImageSharp___original___width'
  | 'childImageSharp___original___height'
  | 'childImageSharp___original___src'
  | 'childImageSharp___resize___src'
  | 'childImageSharp___resize___tracedSVG'
  | 'childImageSharp___resize___width'
  | 'childImageSharp___resize___height'
  | 'childImageSharp___resize___aspectRatio'
  | 'childImageSharp___resize___originalName'
  | 'childImageSharp___id'
  | 'childImageSharp___parent___id'
  | 'childImageSharp___parent___parent___id'
  | 'childImageSharp___parent___parent___children'
  | 'childImageSharp___parent___children'
  | 'childImageSharp___parent___children___id'
  | 'childImageSharp___parent___children___children'
  | 'childImageSharp___parent___internal___content'
  | 'childImageSharp___parent___internal___contentDigest'
  | 'childImageSharp___parent___internal___description'
  | 'childImageSharp___parent___internal___fieldOwners'
  | 'childImageSharp___parent___internal___ignoreType'
  | 'childImageSharp___parent___internal___mediaType'
  | 'childImageSharp___parent___internal___owner'
  | 'childImageSharp___parent___internal___type'
  | 'childImageSharp___children'
  | 'childImageSharp___children___id'
  | 'childImageSharp___children___parent___id'
  | 'childImageSharp___children___parent___children'
  | 'childImageSharp___children___children'
  | 'childImageSharp___children___children___id'
  | 'childImageSharp___children___children___children'
  | 'childImageSharp___children___internal___content'
  | 'childImageSharp___children___internal___contentDigest'
  | 'childImageSharp___children___internal___description'
  | 'childImageSharp___children___internal___fieldOwners'
  | 'childImageSharp___children___internal___ignoreType'
  | 'childImageSharp___children___internal___mediaType'
  | 'childImageSharp___children___internal___owner'
  | 'childImageSharp___children___internal___type'
  | 'childImageSharp___internal___content'
  | 'childImageSharp___internal___contentDigest'
  | 'childImageSharp___internal___description'
  | 'childImageSharp___internal___fieldOwners'
  | 'childImageSharp___internal___ignoreType'
  | 'childImageSharp___internal___mediaType'
  | 'childImageSharp___internal___owner'
  | 'childImageSharp___internal___type'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type FileGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileEdge>;
  nodes: Array<File>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<FileGroupConnection>;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};


export type FileGroupConnectionDistinctArgs = {
  field: FileFieldsEnum;
};


export type FileGroupConnectionMaxArgs = {
  field: FileFieldsEnum;
};


export type FileGroupConnectionMinArgs = {
  field: FileFieldsEnum;
};


export type FileGroupConnectionSumArgs = {
  field: FileFieldsEnum;
};


export type FileGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: FileFieldsEnum;
};

export type FileSortInput = {
  fields: Maybe<Array<Maybe<FileFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type SortOrderEnum =
  | 'ASC'
  | 'DESC';

export type DirectoryConnection = {
  totalCount: Scalars['Int'];
  edges: Array<DirectoryEdge>;
  nodes: Array<Directory>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<DirectoryGroupConnection>;
};


export type DirectoryConnectionDistinctArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryConnectionMaxArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryConnectionMinArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryConnectionSumArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: DirectoryFieldsEnum;
};

export type DirectoryEdge = {
  next: Maybe<Directory>;
  node: Directory;
  previous: Maybe<Directory>;
};

export type DirectoryFieldsEnum =
  | 'sourceInstanceName'
  | 'absolutePath'
  | 'relativePath'
  | 'extension'
  | 'size'
  | 'prettySize'
  | 'modifiedTime'
  | 'accessTime'
  | 'changeTime'
  | 'birthTime'
  | 'root'
  | 'dir'
  | 'base'
  | 'ext'
  | 'name'
  | 'relativeDirectory'
  | 'dev'
  | 'mode'
  | 'nlink'
  | 'uid'
  | 'gid'
  | 'rdev'
  | 'ino'
  | 'atimeMs'
  | 'mtimeMs'
  | 'ctimeMs'
  | 'atime'
  | 'mtime'
  | 'ctime'
  | 'birthtime'
  | 'birthtimeMs'
  | 'blksize'
  | 'blocks'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type DirectoryGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<DirectoryEdge>;
  nodes: Array<Directory>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<DirectoryGroupConnection>;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};


export type DirectoryGroupConnectionDistinctArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryGroupConnectionMaxArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryGroupConnectionMinArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryGroupConnectionSumArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: DirectoryFieldsEnum;
};

export type DirectoryFilterInput = {
  sourceInstanceName: Maybe<StringQueryOperatorInput>;
  absolutePath: Maybe<StringQueryOperatorInput>;
  relativePath: Maybe<StringQueryOperatorInput>;
  extension: Maybe<StringQueryOperatorInput>;
  size: Maybe<IntQueryOperatorInput>;
  prettySize: Maybe<StringQueryOperatorInput>;
  modifiedTime: Maybe<DateQueryOperatorInput>;
  accessTime: Maybe<DateQueryOperatorInput>;
  changeTime: Maybe<DateQueryOperatorInput>;
  birthTime: Maybe<DateQueryOperatorInput>;
  root: Maybe<StringQueryOperatorInput>;
  dir: Maybe<StringQueryOperatorInput>;
  base: Maybe<StringQueryOperatorInput>;
  ext: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  relativeDirectory: Maybe<StringQueryOperatorInput>;
  dev: Maybe<IntQueryOperatorInput>;
  mode: Maybe<IntQueryOperatorInput>;
  nlink: Maybe<IntQueryOperatorInput>;
  uid: Maybe<IntQueryOperatorInput>;
  gid: Maybe<IntQueryOperatorInput>;
  rdev: Maybe<IntQueryOperatorInput>;
  ino: Maybe<FloatQueryOperatorInput>;
  atimeMs: Maybe<FloatQueryOperatorInput>;
  mtimeMs: Maybe<FloatQueryOperatorInput>;
  ctimeMs: Maybe<FloatQueryOperatorInput>;
  atime: Maybe<DateQueryOperatorInput>;
  mtime: Maybe<DateQueryOperatorInput>;
  ctime: Maybe<DateQueryOperatorInput>;
  birthtime: Maybe<DateQueryOperatorInput>;
  birthtimeMs: Maybe<FloatQueryOperatorInput>;
  blksize: Maybe<IntQueryOperatorInput>;
  blocks: Maybe<IntQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type DirectorySortInput = {
  fields: Maybe<Array<Maybe<DirectoryFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type SiteSiteMetadataFilterInput = {
  title: Maybe<StringQueryOperatorInput>;
  description: Maybe<StringQueryOperatorInput>;
  siteUrl: Maybe<StringQueryOperatorInput>;
  siteInfo: Maybe<SiteSiteMetadataSiteInfoFilterInput>;
  authorInfo: Maybe<SiteSiteMetadataAuthorInfoFilterInput>;
  emailSubscriptionService: Maybe<SiteSiteMetadataEmailSubscriptionServiceFilterInput>;
  carbonAdsService: Maybe<SiteSiteMetadataCarbonAdsServiceFilterInput>;
  featured: Maybe<SiteSiteMetadataFeaturedFilterInput>;
  googleCustomSearchId: Maybe<StringQueryOperatorInput>;
  githubCommentsRepository: Maybe<StringQueryOperatorInput>;
};

export type SiteSiteMetadataSiteInfoFilterInput = {
  title: Maybe<StringQueryOperatorInput>;
  description: Maybe<StringQueryOperatorInput>;
  metaTitle: Maybe<StringQueryOperatorInput>;
  metaDescription: Maybe<StringQueryOperatorInput>;
  url: Maybe<StringQueryOperatorInput>;
  repositoryUrl: Maybe<StringQueryOperatorInput>;
};

export type SiteSiteMetadataAuthorInfoFilterInput = {
  name: Maybe<StringQueryOperatorInput>;
  description: Maybe<StringQueryOperatorInput>;
  email: Maybe<StringQueryOperatorInput>;
  jobTitle: Maybe<StringQueryOperatorInput>;
  profiles: Maybe<SiteSiteMetadataAuthorInfoProfilesFilterInput>;
  nicknames: Maybe<SiteSiteMetadataAuthorInfoNicknamesFilterInput>;
};

export type SiteSiteMetadataAuthorInfoProfilesFilterInput = {
  stackoverflow: Maybe<StringQueryOperatorInput>;
  twitter: Maybe<StringQueryOperatorInput>;
  linkedin: Maybe<StringQueryOperatorInput>;
  github: Maybe<StringQueryOperatorInput>;
  facebook: Maybe<StringQueryOperatorInput>;
};

export type SiteSiteMetadataAuthorInfoNicknamesFilterInput = {
  twitter: Maybe<StringQueryOperatorInput>;
};

export type SiteSiteMetadataEmailSubscriptionServiceFilterInput = {
  endpoint: Maybe<StringQueryOperatorInput>;
  hiddenFieldName: Maybe<StringQueryOperatorInput>;
};

export type SiteSiteMetadataCarbonAdsServiceFilterInput = {
  scriptSrc: Maybe<StringQueryOperatorInput>;
  isEnabled: Maybe<BooleanQueryOperatorInput>;
  isProductionMode: Maybe<BooleanQueryOperatorInput>;
};

export type SiteSiteMetadataFeaturedFilterInput = {
  popularPostsByCategory: Maybe<SiteSiteMetadataFeaturedPopularPostsByCategoryFilterListInput>;
};

export type SiteSiteMetadataFeaturedPopularPostsByCategoryFilterListInput = {
  elemMatch: Maybe<SiteSiteMetadataFeaturedPopularPostsByCategoryFilterInput>;
};

export type SiteSiteMetadataFeaturedPopularPostsByCategoryFilterInput = {
  category: Maybe<StringQueryOperatorInput>;
  slugs: Maybe<StringQueryOperatorInput>;
};

export type SiteFlagsFilterInput = {
  DEV_SSR: Maybe<BooleanQueryOperatorInput>;
};

export type SiteConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteEdge>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<SiteGroupConnection>;
};


export type SiteConnectionDistinctArgs = {
  field: SiteFieldsEnum;
};


export type SiteConnectionMaxArgs = {
  field: SiteFieldsEnum;
};


export type SiteConnectionMinArgs = {
  field: SiteFieldsEnum;
};


export type SiteConnectionSumArgs = {
  field: SiteFieldsEnum;
};


export type SiteConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SiteFieldsEnum;
};

export type SiteEdge = {
  next: Maybe<Site>;
  node: Site;
  previous: Maybe<Site>;
};

export type SiteFieldsEnum =
  | 'buildTime'
  | 'siteMetadata___title'
  | 'siteMetadata___description'
  | 'siteMetadata___siteUrl'
  | 'siteMetadata___siteInfo___title'
  | 'siteMetadata___siteInfo___description'
  | 'siteMetadata___siteInfo___metaTitle'
  | 'siteMetadata___siteInfo___metaDescription'
  | 'siteMetadata___siteInfo___url'
  | 'siteMetadata___siteInfo___repositoryUrl'
  | 'siteMetadata___authorInfo___name'
  | 'siteMetadata___authorInfo___description'
  | 'siteMetadata___authorInfo___email'
  | 'siteMetadata___authorInfo___jobTitle'
  | 'siteMetadata___authorInfo___profiles___stackoverflow'
  | 'siteMetadata___authorInfo___profiles___twitter'
  | 'siteMetadata___authorInfo___profiles___linkedin'
  | 'siteMetadata___authorInfo___profiles___github'
  | 'siteMetadata___authorInfo___profiles___facebook'
  | 'siteMetadata___authorInfo___nicknames___twitter'
  | 'siteMetadata___emailSubscriptionService___endpoint'
  | 'siteMetadata___emailSubscriptionService___hiddenFieldName'
  | 'siteMetadata___carbonAdsService___scriptSrc'
  | 'siteMetadata___carbonAdsService___isEnabled'
  | 'siteMetadata___carbonAdsService___isProductionMode'
  | 'siteMetadata___featured___popularPostsByCategory'
  | 'siteMetadata___featured___popularPostsByCategory___category'
  | 'siteMetadata___featured___popularPostsByCategory___slugs'
  | 'siteMetadata___googleCustomSearchId'
  | 'siteMetadata___githubCommentsRepository'
  | 'port'
  | 'host'
  | 'pathPrefix'
  | 'flags___DEV_SSR'
  | 'polyfill'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type SiteGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteEdge>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<SiteGroupConnection>;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};


export type SiteGroupConnectionDistinctArgs = {
  field: SiteFieldsEnum;
};


export type SiteGroupConnectionMaxArgs = {
  field: SiteFieldsEnum;
};


export type SiteGroupConnectionMinArgs = {
  field: SiteFieldsEnum;
};


export type SiteGroupConnectionSumArgs = {
  field: SiteFieldsEnum;
};


export type SiteGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SiteFieldsEnum;
};

export type SiteFilterInput = {
  buildTime: Maybe<DateQueryOperatorInput>;
  siteMetadata: Maybe<SiteSiteMetadataFilterInput>;
  port: Maybe<IntQueryOperatorInput>;
  host: Maybe<StringQueryOperatorInput>;
  pathPrefix: Maybe<StringQueryOperatorInput>;
  flags: Maybe<SiteFlagsFilterInput>;
  polyfill: Maybe<BooleanQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type SiteSortInput = {
  fields: Maybe<Array<Maybe<SiteFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type SiteFunctionConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteFunctionEdge>;
  nodes: Array<SiteFunction>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<SiteFunctionGroupConnection>;
};


export type SiteFunctionConnectionDistinctArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionConnectionMaxArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionConnectionMinArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionConnectionSumArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SiteFunctionFieldsEnum;
};

export type SiteFunctionEdge = {
  next: Maybe<SiteFunction>;
  node: SiteFunction;
  previous: Maybe<SiteFunction>;
};

export type SiteFunctionFieldsEnum =
  | 'functionRoute'
  | 'pluginName'
  | 'originalAbsoluteFilePath'
  | 'originalRelativeFilePath'
  | 'relativeCompiledFilePath'
  | 'absoluteCompiledFilePath'
  | 'matchPath'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type SiteFunctionGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteFunctionEdge>;
  nodes: Array<SiteFunction>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<SiteFunctionGroupConnection>;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};


export type SiteFunctionGroupConnectionDistinctArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionGroupConnectionMaxArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionGroupConnectionMinArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionGroupConnectionSumArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SiteFunctionFieldsEnum;
};

export type SiteFunctionFilterInput = {
  functionRoute: Maybe<StringQueryOperatorInput>;
  pluginName: Maybe<StringQueryOperatorInput>;
  originalAbsoluteFilePath: Maybe<StringQueryOperatorInput>;
  originalRelativeFilePath: Maybe<StringQueryOperatorInput>;
  relativeCompiledFilePath: Maybe<StringQueryOperatorInput>;
  absoluteCompiledFilePath: Maybe<StringQueryOperatorInput>;
  matchPath: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type SiteFunctionSortInput = {
  fields: Maybe<Array<Maybe<SiteFunctionFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type SitePluginFilterInput = {
  resolve: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  version: Maybe<StringQueryOperatorInput>;
  nodeAPIs: Maybe<StringQueryOperatorInput>;
  browserAPIs: Maybe<StringQueryOperatorInput>;
  ssrAPIs: Maybe<StringQueryOperatorInput>;
  pluginFilepath: Maybe<StringQueryOperatorInput>;
  pluginOptions: Maybe<SitePluginPluginOptionsFilterInput>;
  packageJson: Maybe<SitePluginPackageJsonFilterInput>;
  subPluginPaths: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type SitePluginPluginOptionsFilterInput = {
  plugins: Maybe<SitePluginPluginOptionsPluginsFilterListInput>;
  tight: Maybe<BooleanQueryOperatorInput>;
  fromHeading: Maybe<IntQueryOperatorInput>;
  defaults: Maybe<SitePluginPluginOptionsDefaultsFilterInput>;
  base64Width: Maybe<IntQueryOperatorInput>;
  stripMetadata: Maybe<BooleanQueryOperatorInput>;
  defaultQuality: Maybe<IntQueryOperatorInput>;
  failOnError: Maybe<BooleanQueryOperatorInput>;
  linkImagesToOriginal: Maybe<BooleanQueryOperatorInput>;
  sizeByPixelDensity: Maybe<BooleanQueryOperatorInput>;
  quality: Maybe<IntQueryOperatorInput>;
  withWebp: Maybe<BooleanQueryOperatorInput>;
  maxWidth: Maybe<IntQueryOperatorInput>;
  showCaptions: Maybe<BooleanQueryOperatorInput>;
  markdownCaptions: Maybe<BooleanQueryOperatorInput>;
  backgroundColor: Maybe<StringQueryOperatorInput>;
  tracedSVG: Maybe<BooleanQueryOperatorInput>;
  loading: Maybe<StringQueryOperatorInput>;
  decoding: Maybe<StringQueryOperatorInput>;
  disableBgImageOnAlpha: Maybe<BooleanQueryOperatorInput>;
  disableBgImage: Maybe<BooleanQueryOperatorInput>;
  wrapperStyle: Maybe<StringQueryOperatorInput>;
  theme: Maybe<StringQueryOperatorInput>;
  vfsRoot: Maybe<StringQueryOperatorInput>;
  defaultText: Maybe<StringQueryOperatorInput>;
  directory: Maybe<StringQueryOperatorInput>;
  html: Maybe<StringQueryOperatorInput>;
  target: Maybe<StringQueryOperatorInput>;
  icon: Maybe<StringQueryOperatorInput>;
  offsetY: Maybe<IntQueryOperatorInput>;
  className: Maybe<StringQueryOperatorInput>;
  isTSX: Maybe<BooleanQueryOperatorInput>;
  jsxPragma: Maybe<StringQueryOperatorInput>;
  allExtensions: Maybe<BooleanQueryOperatorInput>;
  path: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  trackingId: Maybe<StringQueryOperatorInput>;
  head: Maybe<BooleanQueryOperatorInput>;
  anonymize: Maybe<BooleanQueryOperatorInput>;
  respectDNT: Maybe<BooleanQueryOperatorInput>;
  pageTransitionDelay: Maybe<IntQueryOperatorInput>;
  enableWebVitalsTracking: Maybe<BooleanQueryOperatorInput>;
  documentPaths: Maybe<StringQueryOperatorInput>;
  codegenConfig: Maybe<SitePluginPluginOptionsCodegenConfigFilterInput>;
  output: Maybe<StringQueryOperatorInput>;
  createLinkInHead: Maybe<BooleanQueryOperatorInput>;
  entryLimit: Maybe<IntQueryOperatorInput>;
  query: Maybe<StringQueryOperatorInput>;
  sassOptions: Maybe<SitePluginPluginOptionsSassOptionsFilterInput>;
  feeds: Maybe<SitePluginPluginOptionsFeedsFilterListInput>;
  id: Maybe<StringQueryOperatorInput>;
  key: Maybe<StringQueryOperatorInput>;
  pathCheck: Maybe<BooleanQueryOperatorInput>;
};

export type SitePluginPluginOptionsPluginsFilterListInput = {
  elemMatch: Maybe<SitePluginPluginOptionsPluginsFilterInput>;
};

export type SitePluginPluginOptionsPluginsFilterInput = {
  resolve: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  version: Maybe<StringQueryOperatorInput>;
  pluginOptions: Maybe<SitePluginPluginOptionsPluginsPluginOptionsFilterInput>;
  nodeAPIs: Maybe<StringQueryOperatorInput>;
  browserAPIs: Maybe<StringQueryOperatorInput>;
  ssrAPIs: Maybe<StringQueryOperatorInput>;
  pluginFilepath: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsPluginsPluginOptionsFilterInput = {
  tight: Maybe<BooleanQueryOperatorInput>;
  fromHeading: Maybe<IntQueryOperatorInput>;
  defaults: Maybe<SitePluginPluginOptionsPluginsPluginOptionsDefaultsFilterInput>;
  base64Width: Maybe<IntQueryOperatorInput>;
  stripMetadata: Maybe<BooleanQueryOperatorInput>;
  defaultQuality: Maybe<IntQueryOperatorInput>;
  failOnError: Maybe<BooleanQueryOperatorInput>;
  linkImagesToOriginal: Maybe<BooleanQueryOperatorInput>;
  sizeByPixelDensity: Maybe<BooleanQueryOperatorInput>;
  quality: Maybe<IntQueryOperatorInput>;
  withWebp: Maybe<BooleanQueryOperatorInput>;
  maxWidth: Maybe<IntQueryOperatorInput>;
  showCaptions: Maybe<BooleanQueryOperatorInput>;
  markdownCaptions: Maybe<BooleanQueryOperatorInput>;
  backgroundColor: Maybe<StringQueryOperatorInput>;
  tracedSVG: Maybe<BooleanQueryOperatorInput>;
  loading: Maybe<StringQueryOperatorInput>;
  decoding: Maybe<StringQueryOperatorInput>;
  disableBgImageOnAlpha: Maybe<BooleanQueryOperatorInput>;
  disableBgImage: Maybe<BooleanQueryOperatorInput>;
  wrapperStyle: Maybe<StringQueryOperatorInput>;
  theme: Maybe<StringQueryOperatorInput>;
  vfsRoot: Maybe<StringQueryOperatorInput>;
  defaultText: Maybe<StringQueryOperatorInput>;
  directory: Maybe<StringQueryOperatorInput>;
  html: Maybe<StringQueryOperatorInput>;
  target: Maybe<StringQueryOperatorInput>;
  icon: Maybe<StringQueryOperatorInput>;
  offsetY: Maybe<IntQueryOperatorInput>;
  className: Maybe<StringQueryOperatorInput>;
  isTSX: Maybe<BooleanQueryOperatorInput>;
  jsxPragma: Maybe<StringQueryOperatorInput>;
  allExtensions: Maybe<BooleanQueryOperatorInput>;
};

export type SitePluginPluginOptionsPluginsPluginOptionsDefaultsFilterInput = {
  formats: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsDefaultsFilterInput = {
  formats: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsCodegenConfigFilterInput = {
  avoidOptionals: Maybe<BooleanQueryOperatorInput>;
};

export type SitePluginPluginOptionsSassOptionsFilterInput = {
  includePaths: Maybe<StringQueryOperatorInput>;
  indentedSyntax: Maybe<BooleanQueryOperatorInput>;
  indentType: Maybe<StringQueryOperatorInput>;
  indentWidth: Maybe<IntQueryOperatorInput>;
  linefeed: Maybe<StringQueryOperatorInput>;
  omitSourceMapUrl: Maybe<BooleanQueryOperatorInput>;
  precision: Maybe<IntQueryOperatorInput>;
  sourceComments: Maybe<BooleanQueryOperatorInput>;
  sourceMapContents: Maybe<BooleanQueryOperatorInput>;
  sourceMapEmbed: Maybe<BooleanQueryOperatorInput>;
};

export type SitePluginPluginOptionsFeedsFilterListInput = {
  elemMatch: Maybe<SitePluginPluginOptionsFeedsFilterInput>;
};

export type SitePluginPluginOptionsFeedsFilterInput = {
  query: Maybe<StringQueryOperatorInput>;
  output: Maybe<StringQueryOperatorInput>;
  title: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonFilterInput = {
  name: Maybe<StringQueryOperatorInput>;
  description: Maybe<StringQueryOperatorInput>;
  version: Maybe<StringQueryOperatorInput>;
  main: Maybe<StringQueryOperatorInput>;
  author: Maybe<StringQueryOperatorInput>;
  license: Maybe<StringQueryOperatorInput>;
  dependencies: Maybe<SitePluginPackageJsonDependenciesFilterListInput>;
  devDependencies: Maybe<SitePluginPackageJsonDevDependenciesFilterListInput>;
  peerDependencies: Maybe<SitePluginPackageJsonPeerDependenciesFilterListInput>;
  keywords: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonDependenciesFilterListInput = {
  elemMatch: Maybe<SitePluginPackageJsonDependenciesFilterInput>;
};

export type SitePluginPackageJsonDependenciesFilterInput = {
  name: Maybe<StringQueryOperatorInput>;
  version: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonDevDependenciesFilterListInput = {
  elemMatch: Maybe<SitePluginPackageJsonDevDependenciesFilterInput>;
};

export type SitePluginPackageJsonDevDependenciesFilterInput = {
  name: Maybe<StringQueryOperatorInput>;
  version: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonPeerDependenciesFilterListInput = {
  elemMatch: Maybe<SitePluginPackageJsonPeerDependenciesFilterInput>;
};

export type SitePluginPackageJsonPeerDependenciesFilterInput = {
  name: Maybe<StringQueryOperatorInput>;
  version: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextFilterInput = {
  skip: Maybe<IntQueryOperatorInput>;
  limit: Maybe<IntQueryOperatorInput>;
  currentPage: Maybe<IntQueryOperatorInput>;
  pagesSum: Maybe<IntQueryOperatorInput>;
  popularPostsSlugs: Maybe<StringQueryOperatorInput>;
  slug: Maybe<StringQueryOperatorInput>;
  recommended: Maybe<StringQueryOperatorInput>;
  githubIssueSearchQuery: Maybe<StringQueryOperatorInput>;
  tag: Maybe<StringQueryOperatorInput>;
};

export type SitePageConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePageEdge>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<SitePageGroupConnection>;
};


export type SitePageConnectionDistinctArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageConnectionMaxArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageConnectionMinArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageConnectionSumArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SitePageFieldsEnum;
};

export type SitePageEdge = {
  next: Maybe<SitePage>;
  node: SitePage;
  previous: Maybe<SitePage>;
};

export type SitePageFieldsEnum =
  | 'path'
  | 'component'
  | 'internalComponentName'
  | 'componentChunkName'
  | 'matchPath'
  | 'isCreatedByStatefulCreatePages'
  | 'pluginCreator___resolve'
  | 'pluginCreator___name'
  | 'pluginCreator___version'
  | 'pluginCreator___nodeAPIs'
  | 'pluginCreator___browserAPIs'
  | 'pluginCreator___ssrAPIs'
  | 'pluginCreator___pluginFilepath'
  | 'pluginCreator___pluginOptions___plugins'
  | 'pluginCreator___pluginOptions___plugins___resolve'
  | 'pluginCreator___pluginOptions___plugins___name'
  | 'pluginCreator___pluginOptions___plugins___id'
  | 'pluginCreator___pluginOptions___plugins___version'
  | 'pluginCreator___pluginOptions___plugins___nodeAPIs'
  | 'pluginCreator___pluginOptions___plugins___browserAPIs'
  | 'pluginCreator___pluginOptions___plugins___ssrAPIs'
  | 'pluginCreator___pluginOptions___plugins___pluginFilepath'
  | 'pluginCreator___pluginOptions___tight'
  | 'pluginCreator___pluginOptions___fromHeading'
  | 'pluginCreator___pluginOptions___defaults___formats'
  | 'pluginCreator___pluginOptions___base64Width'
  | 'pluginCreator___pluginOptions___stripMetadata'
  | 'pluginCreator___pluginOptions___defaultQuality'
  | 'pluginCreator___pluginOptions___failOnError'
  | 'pluginCreator___pluginOptions___linkImagesToOriginal'
  | 'pluginCreator___pluginOptions___sizeByPixelDensity'
  | 'pluginCreator___pluginOptions___quality'
  | 'pluginCreator___pluginOptions___withWebp'
  | 'pluginCreator___pluginOptions___maxWidth'
  | 'pluginCreator___pluginOptions___showCaptions'
  | 'pluginCreator___pluginOptions___markdownCaptions'
  | 'pluginCreator___pluginOptions___backgroundColor'
  | 'pluginCreator___pluginOptions___tracedSVG'
  | 'pluginCreator___pluginOptions___loading'
  | 'pluginCreator___pluginOptions___decoding'
  | 'pluginCreator___pluginOptions___disableBgImageOnAlpha'
  | 'pluginCreator___pluginOptions___disableBgImage'
  | 'pluginCreator___pluginOptions___wrapperStyle'
  | 'pluginCreator___pluginOptions___theme'
  | 'pluginCreator___pluginOptions___vfsRoot'
  | 'pluginCreator___pluginOptions___defaultText'
  | 'pluginCreator___pluginOptions___directory'
  | 'pluginCreator___pluginOptions___html'
  | 'pluginCreator___pluginOptions___target'
  | 'pluginCreator___pluginOptions___icon'
  | 'pluginCreator___pluginOptions___offsetY'
  | 'pluginCreator___pluginOptions___className'
  | 'pluginCreator___pluginOptions___isTSX'
  | 'pluginCreator___pluginOptions___jsxPragma'
  | 'pluginCreator___pluginOptions___allExtensions'
  | 'pluginCreator___pluginOptions___path'
  | 'pluginCreator___pluginOptions___name'
  | 'pluginCreator___pluginOptions___trackingId'
  | 'pluginCreator___pluginOptions___head'
  | 'pluginCreator___pluginOptions___anonymize'
  | 'pluginCreator___pluginOptions___respectDNT'
  | 'pluginCreator___pluginOptions___pageTransitionDelay'
  | 'pluginCreator___pluginOptions___enableWebVitalsTracking'
  | 'pluginCreator___pluginOptions___documentPaths'
  | 'pluginCreator___pluginOptions___codegenConfig___avoidOptionals'
  | 'pluginCreator___pluginOptions___output'
  | 'pluginCreator___pluginOptions___createLinkInHead'
  | 'pluginCreator___pluginOptions___entryLimit'
  | 'pluginCreator___pluginOptions___query'
  | 'pluginCreator___pluginOptions___sassOptions___includePaths'
  | 'pluginCreator___pluginOptions___sassOptions___indentedSyntax'
  | 'pluginCreator___pluginOptions___sassOptions___indentType'
  | 'pluginCreator___pluginOptions___sassOptions___indentWidth'
  | 'pluginCreator___pluginOptions___sassOptions___linefeed'
  | 'pluginCreator___pluginOptions___sassOptions___omitSourceMapUrl'
  | 'pluginCreator___pluginOptions___sassOptions___precision'
  | 'pluginCreator___pluginOptions___sassOptions___sourceComments'
  | 'pluginCreator___pluginOptions___sassOptions___sourceMapContents'
  | 'pluginCreator___pluginOptions___sassOptions___sourceMapEmbed'
  | 'pluginCreator___pluginOptions___feeds'
  | 'pluginCreator___pluginOptions___feeds___query'
  | 'pluginCreator___pluginOptions___feeds___output'
  | 'pluginCreator___pluginOptions___feeds___title'
  | 'pluginCreator___pluginOptions___id'
  | 'pluginCreator___pluginOptions___key'
  | 'pluginCreator___pluginOptions___pathCheck'
  | 'pluginCreator___packageJson___name'
  | 'pluginCreator___packageJson___description'
  | 'pluginCreator___packageJson___version'
  | 'pluginCreator___packageJson___main'
  | 'pluginCreator___packageJson___author'
  | 'pluginCreator___packageJson___license'
  | 'pluginCreator___packageJson___dependencies'
  | 'pluginCreator___packageJson___dependencies___name'
  | 'pluginCreator___packageJson___dependencies___version'
  | 'pluginCreator___packageJson___devDependencies'
  | 'pluginCreator___packageJson___devDependencies___name'
  | 'pluginCreator___packageJson___devDependencies___version'
  | 'pluginCreator___packageJson___peerDependencies'
  | 'pluginCreator___packageJson___peerDependencies___name'
  | 'pluginCreator___packageJson___peerDependencies___version'
  | 'pluginCreator___packageJson___keywords'
  | 'pluginCreator___subPluginPaths'
  | 'pluginCreator___id'
  | 'pluginCreator___parent___id'
  | 'pluginCreator___parent___parent___id'
  | 'pluginCreator___parent___parent___children'
  | 'pluginCreator___parent___children'
  | 'pluginCreator___parent___children___id'
  | 'pluginCreator___parent___children___children'
  | 'pluginCreator___parent___internal___content'
  | 'pluginCreator___parent___internal___contentDigest'
  | 'pluginCreator___parent___internal___description'
  | 'pluginCreator___parent___internal___fieldOwners'
  | 'pluginCreator___parent___internal___ignoreType'
  | 'pluginCreator___parent___internal___mediaType'
  | 'pluginCreator___parent___internal___owner'
  | 'pluginCreator___parent___internal___type'
  | 'pluginCreator___children'
  | 'pluginCreator___children___id'
  | 'pluginCreator___children___parent___id'
  | 'pluginCreator___children___parent___children'
  | 'pluginCreator___children___children'
  | 'pluginCreator___children___children___id'
  | 'pluginCreator___children___children___children'
  | 'pluginCreator___children___internal___content'
  | 'pluginCreator___children___internal___contentDigest'
  | 'pluginCreator___children___internal___description'
  | 'pluginCreator___children___internal___fieldOwners'
  | 'pluginCreator___children___internal___ignoreType'
  | 'pluginCreator___children___internal___mediaType'
  | 'pluginCreator___children___internal___owner'
  | 'pluginCreator___children___internal___type'
  | 'pluginCreator___internal___content'
  | 'pluginCreator___internal___contentDigest'
  | 'pluginCreator___internal___description'
  | 'pluginCreator___internal___fieldOwners'
  | 'pluginCreator___internal___ignoreType'
  | 'pluginCreator___internal___mediaType'
  | 'pluginCreator___internal___owner'
  | 'pluginCreator___internal___type'
  | 'pluginCreatorId'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'context___skip'
  | 'context___limit'
  | 'context___currentPage'
  | 'context___pagesSum'
  | 'context___popularPostsSlugs'
  | 'context___slug'
  | 'context___recommended'
  | 'context___githubIssueSearchQuery'
  | 'context___tag';

export type SitePageGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePageEdge>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<SitePageGroupConnection>;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};


export type SitePageGroupConnectionDistinctArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageGroupConnectionMaxArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageGroupConnectionMinArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageGroupConnectionSumArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SitePageFieldsEnum;
};

export type SitePageFilterInput = {
  path: Maybe<StringQueryOperatorInput>;
  component: Maybe<StringQueryOperatorInput>;
  internalComponentName: Maybe<StringQueryOperatorInput>;
  componentChunkName: Maybe<StringQueryOperatorInput>;
  matchPath: Maybe<StringQueryOperatorInput>;
  isCreatedByStatefulCreatePages: Maybe<BooleanQueryOperatorInput>;
  pluginCreator: Maybe<SitePluginFilterInput>;
  pluginCreatorId: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  context: Maybe<SitePageContextFilterInput>;
};

export type SitePageSortInput = {
  fields: Maybe<Array<Maybe<SitePageFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type SitePluginConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePluginEdge>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<SitePluginGroupConnection>;
};


export type SitePluginConnectionDistinctArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginConnectionMaxArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginConnectionMinArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginConnectionSumArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SitePluginFieldsEnum;
};

export type SitePluginEdge = {
  next: Maybe<SitePlugin>;
  node: SitePlugin;
  previous: Maybe<SitePlugin>;
};

export type SitePluginFieldsEnum =
  | 'resolve'
  | 'name'
  | 'version'
  | 'nodeAPIs'
  | 'browserAPIs'
  | 'ssrAPIs'
  | 'pluginFilepath'
  | 'pluginOptions___plugins'
  | 'pluginOptions___plugins___resolve'
  | 'pluginOptions___plugins___name'
  | 'pluginOptions___plugins___id'
  | 'pluginOptions___plugins___version'
  | 'pluginOptions___plugins___pluginOptions___tight'
  | 'pluginOptions___plugins___pluginOptions___fromHeading'
  | 'pluginOptions___plugins___pluginOptions___base64Width'
  | 'pluginOptions___plugins___pluginOptions___stripMetadata'
  | 'pluginOptions___plugins___pluginOptions___defaultQuality'
  | 'pluginOptions___plugins___pluginOptions___failOnError'
  | 'pluginOptions___plugins___pluginOptions___linkImagesToOriginal'
  | 'pluginOptions___plugins___pluginOptions___sizeByPixelDensity'
  | 'pluginOptions___plugins___pluginOptions___quality'
  | 'pluginOptions___plugins___pluginOptions___withWebp'
  | 'pluginOptions___plugins___pluginOptions___maxWidth'
  | 'pluginOptions___plugins___pluginOptions___showCaptions'
  | 'pluginOptions___plugins___pluginOptions___markdownCaptions'
  | 'pluginOptions___plugins___pluginOptions___backgroundColor'
  | 'pluginOptions___plugins___pluginOptions___tracedSVG'
  | 'pluginOptions___plugins___pluginOptions___loading'
  | 'pluginOptions___plugins___pluginOptions___decoding'
  | 'pluginOptions___plugins___pluginOptions___disableBgImageOnAlpha'
  | 'pluginOptions___plugins___pluginOptions___disableBgImage'
  | 'pluginOptions___plugins___pluginOptions___wrapperStyle'
  | 'pluginOptions___plugins___pluginOptions___theme'
  | 'pluginOptions___plugins___pluginOptions___vfsRoot'
  | 'pluginOptions___plugins___pluginOptions___defaultText'
  | 'pluginOptions___plugins___pluginOptions___directory'
  | 'pluginOptions___plugins___pluginOptions___html'
  | 'pluginOptions___plugins___pluginOptions___target'
  | 'pluginOptions___plugins___pluginOptions___icon'
  | 'pluginOptions___plugins___pluginOptions___offsetY'
  | 'pluginOptions___plugins___pluginOptions___className'
  | 'pluginOptions___plugins___pluginOptions___isTSX'
  | 'pluginOptions___plugins___pluginOptions___jsxPragma'
  | 'pluginOptions___plugins___pluginOptions___allExtensions'
  | 'pluginOptions___plugins___nodeAPIs'
  | 'pluginOptions___plugins___browserAPIs'
  | 'pluginOptions___plugins___ssrAPIs'
  | 'pluginOptions___plugins___pluginFilepath'
  | 'pluginOptions___tight'
  | 'pluginOptions___fromHeading'
  | 'pluginOptions___defaults___formats'
  | 'pluginOptions___base64Width'
  | 'pluginOptions___stripMetadata'
  | 'pluginOptions___defaultQuality'
  | 'pluginOptions___failOnError'
  | 'pluginOptions___linkImagesToOriginal'
  | 'pluginOptions___sizeByPixelDensity'
  | 'pluginOptions___quality'
  | 'pluginOptions___withWebp'
  | 'pluginOptions___maxWidth'
  | 'pluginOptions___showCaptions'
  | 'pluginOptions___markdownCaptions'
  | 'pluginOptions___backgroundColor'
  | 'pluginOptions___tracedSVG'
  | 'pluginOptions___loading'
  | 'pluginOptions___decoding'
  | 'pluginOptions___disableBgImageOnAlpha'
  | 'pluginOptions___disableBgImage'
  | 'pluginOptions___wrapperStyle'
  | 'pluginOptions___theme'
  | 'pluginOptions___vfsRoot'
  | 'pluginOptions___defaultText'
  | 'pluginOptions___directory'
  | 'pluginOptions___html'
  | 'pluginOptions___target'
  | 'pluginOptions___icon'
  | 'pluginOptions___offsetY'
  | 'pluginOptions___className'
  | 'pluginOptions___isTSX'
  | 'pluginOptions___jsxPragma'
  | 'pluginOptions___allExtensions'
  | 'pluginOptions___path'
  | 'pluginOptions___name'
  | 'pluginOptions___trackingId'
  | 'pluginOptions___head'
  | 'pluginOptions___anonymize'
  | 'pluginOptions___respectDNT'
  | 'pluginOptions___pageTransitionDelay'
  | 'pluginOptions___enableWebVitalsTracking'
  | 'pluginOptions___documentPaths'
  | 'pluginOptions___codegenConfig___avoidOptionals'
  | 'pluginOptions___output'
  | 'pluginOptions___createLinkInHead'
  | 'pluginOptions___entryLimit'
  | 'pluginOptions___query'
  | 'pluginOptions___sassOptions___includePaths'
  | 'pluginOptions___sassOptions___indentedSyntax'
  | 'pluginOptions___sassOptions___indentType'
  | 'pluginOptions___sassOptions___indentWidth'
  | 'pluginOptions___sassOptions___linefeed'
  | 'pluginOptions___sassOptions___omitSourceMapUrl'
  | 'pluginOptions___sassOptions___precision'
  | 'pluginOptions___sassOptions___sourceComments'
  | 'pluginOptions___sassOptions___sourceMapContents'
  | 'pluginOptions___sassOptions___sourceMapEmbed'
  | 'pluginOptions___feeds'
  | 'pluginOptions___feeds___query'
  | 'pluginOptions___feeds___output'
  | 'pluginOptions___feeds___title'
  | 'pluginOptions___id'
  | 'pluginOptions___key'
  | 'pluginOptions___pathCheck'
  | 'packageJson___name'
  | 'packageJson___description'
  | 'packageJson___version'
  | 'packageJson___main'
  | 'packageJson___author'
  | 'packageJson___license'
  | 'packageJson___dependencies'
  | 'packageJson___dependencies___name'
  | 'packageJson___dependencies___version'
  | 'packageJson___devDependencies'
  | 'packageJson___devDependencies___name'
  | 'packageJson___devDependencies___version'
  | 'packageJson___peerDependencies'
  | 'packageJson___peerDependencies___name'
  | 'packageJson___peerDependencies___version'
  | 'packageJson___keywords'
  | 'subPluginPaths'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type SitePluginGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePluginEdge>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<SitePluginGroupConnection>;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};


export type SitePluginGroupConnectionDistinctArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginGroupConnectionMaxArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginGroupConnectionMinArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginGroupConnectionSumArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SitePluginFieldsEnum;
};

export type SitePluginSortInput = {
  fields: Maybe<Array<Maybe<SitePluginFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type SiteBuildMetadataConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteBuildMetadataEdge>;
  nodes: Array<SiteBuildMetadata>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<SiteBuildMetadataGroupConnection>;
};


export type SiteBuildMetadataConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataConnectionMaxArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataConnectionMinArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataConnectionSumArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataEdge = {
  next: Maybe<SiteBuildMetadata>;
  node: SiteBuildMetadata;
  previous: Maybe<SiteBuildMetadata>;
};

export type SiteBuildMetadataFieldsEnum =
  | 'buildTime'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type SiteBuildMetadataGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteBuildMetadataEdge>;
  nodes: Array<SiteBuildMetadata>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<SiteBuildMetadataGroupConnection>;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};


export type SiteBuildMetadataGroupConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataGroupConnectionMaxArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataGroupConnectionMinArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataGroupConnectionSumArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataFilterInput = {
  buildTime: Maybe<DateQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type SiteBuildMetadataSortInput = {
  fields: Maybe<Array<Maybe<SiteBuildMetadataFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type MarkdownRemarkConnection = {
  totalCount: Scalars['Int'];
  edges: Array<MarkdownRemarkEdge>;
  nodes: Array<MarkdownRemark>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<MarkdownRemarkGroupConnection>;
};


export type MarkdownRemarkConnectionDistinctArgs = {
  field: MarkdownRemarkFieldsEnum;
};


export type MarkdownRemarkConnectionMaxArgs = {
  field: MarkdownRemarkFieldsEnum;
};


export type MarkdownRemarkConnectionMinArgs = {
  field: MarkdownRemarkFieldsEnum;
};


export type MarkdownRemarkConnectionSumArgs = {
  field: MarkdownRemarkFieldsEnum;
};


export type MarkdownRemarkConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: MarkdownRemarkFieldsEnum;
};

export type MarkdownRemarkEdge = {
  next: Maybe<MarkdownRemark>;
  node: MarkdownRemark;
  previous: Maybe<MarkdownRemark>;
};

export type MarkdownRemarkFieldsEnum =
  | 'id'
  | 'frontmatter___title'
  | 'frontmatter___type'
  | 'frontmatter___description'
  | 'frontmatter___published'
  | 'frontmatter___modified'
  | 'frontmatter___thumbnail___sourceInstanceName'
  | 'frontmatter___thumbnail___absolutePath'
  | 'frontmatter___thumbnail___relativePath'
  | 'frontmatter___thumbnail___extension'
  | 'frontmatter___thumbnail___size'
  | 'frontmatter___thumbnail___prettySize'
  | 'frontmatter___thumbnail___modifiedTime'
  | 'frontmatter___thumbnail___accessTime'
  | 'frontmatter___thumbnail___changeTime'
  | 'frontmatter___thumbnail___birthTime'
  | 'frontmatter___thumbnail___root'
  | 'frontmatter___thumbnail___dir'
  | 'frontmatter___thumbnail___base'
  | 'frontmatter___thumbnail___ext'
  | 'frontmatter___thumbnail___name'
  | 'frontmatter___thumbnail___relativeDirectory'
  | 'frontmatter___thumbnail___dev'
  | 'frontmatter___thumbnail___mode'
  | 'frontmatter___thumbnail___nlink'
  | 'frontmatter___thumbnail___uid'
  | 'frontmatter___thumbnail___gid'
  | 'frontmatter___thumbnail___rdev'
  | 'frontmatter___thumbnail___ino'
  | 'frontmatter___thumbnail___atimeMs'
  | 'frontmatter___thumbnail___mtimeMs'
  | 'frontmatter___thumbnail___ctimeMs'
  | 'frontmatter___thumbnail___atime'
  | 'frontmatter___thumbnail___mtime'
  | 'frontmatter___thumbnail___ctime'
  | 'frontmatter___thumbnail___birthtime'
  | 'frontmatter___thumbnail___birthtimeMs'
  | 'frontmatter___thumbnail___blksize'
  | 'frontmatter___thumbnail___blocks'
  | 'frontmatter___thumbnail___publicURL'
  | 'frontmatter___thumbnail___childrenMarkdownRemark'
  | 'frontmatter___thumbnail___childrenMarkdownRemark___id'
  | 'frontmatter___thumbnail___childrenMarkdownRemark___excerpt'
  | 'frontmatter___thumbnail___childrenMarkdownRemark___rawMarkdownBody'
  | 'frontmatter___thumbnail___childrenMarkdownRemark___fileAbsolutePath'
  | 'frontmatter___thumbnail___childrenMarkdownRemark___html'
  | 'frontmatter___thumbnail___childrenMarkdownRemark___htmlAst'
  | 'frontmatter___thumbnail___childrenMarkdownRemark___excerptAst'
  | 'frontmatter___thumbnail___childrenMarkdownRemark___headings'
  | 'frontmatter___thumbnail___childrenMarkdownRemark___timeToRead'
  | 'frontmatter___thumbnail___childrenMarkdownRemark___tableOfContents'
  | 'frontmatter___thumbnail___childrenMarkdownRemark___children'
  | 'frontmatter___thumbnail___childMarkdownRemark___id'
  | 'frontmatter___thumbnail___childMarkdownRemark___excerpt'
  | 'frontmatter___thumbnail___childMarkdownRemark___rawMarkdownBody'
  | 'frontmatter___thumbnail___childMarkdownRemark___fileAbsolutePath'
  | 'frontmatter___thumbnail___childMarkdownRemark___html'
  | 'frontmatter___thumbnail___childMarkdownRemark___htmlAst'
  | 'frontmatter___thumbnail___childMarkdownRemark___excerptAst'
  | 'frontmatter___thumbnail___childMarkdownRemark___headings'
  | 'frontmatter___thumbnail___childMarkdownRemark___timeToRead'
  | 'frontmatter___thumbnail___childMarkdownRemark___tableOfContents'
  | 'frontmatter___thumbnail___childMarkdownRemark___children'
  | 'frontmatter___thumbnail___childrenImageSharp'
  | 'frontmatter___thumbnail___childrenImageSharp___gatsbyImageData'
  | 'frontmatter___thumbnail___childrenImageSharp___id'
  | 'frontmatter___thumbnail___childrenImageSharp___children'
  | 'frontmatter___thumbnail___childImageSharp___gatsbyImageData'
  | 'frontmatter___thumbnail___childImageSharp___id'
  | 'frontmatter___thumbnail___childImageSharp___children'
  | 'frontmatter___thumbnail___id'
  | 'frontmatter___thumbnail___parent___id'
  | 'frontmatter___thumbnail___parent___children'
  | 'frontmatter___thumbnail___children'
  | 'frontmatter___thumbnail___children___id'
  | 'frontmatter___thumbnail___children___children'
  | 'frontmatter___thumbnail___internal___content'
  | 'frontmatter___thumbnail___internal___contentDigest'
  | 'frontmatter___thumbnail___internal___description'
  | 'frontmatter___thumbnail___internal___fieldOwners'
  | 'frontmatter___thumbnail___internal___ignoreType'
  | 'frontmatter___thumbnail___internal___mediaType'
  | 'frontmatter___thumbnail___internal___owner'
  | 'frontmatter___thumbnail___internal___type'
  | 'frontmatter___slug'
  | 'frontmatter___tags'
  | 'frontmatter___recommended'
  | 'excerpt'
  | 'rawMarkdownBody'
  | 'fileAbsolutePath'
  | 'html'
  | 'htmlAst'
  | 'excerptAst'
  | 'headings'
  | 'headings___id'
  | 'headings___value'
  | 'headings___depth'
  | 'timeToRead'
  | 'tableOfContents'
  | 'wordCount___paragraphs'
  | 'wordCount___sentences'
  | 'wordCount___words'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type MarkdownRemarkGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<MarkdownRemarkEdge>;
  nodes: Array<MarkdownRemark>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<MarkdownRemarkGroupConnection>;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};


export type MarkdownRemarkGroupConnectionDistinctArgs = {
  field: MarkdownRemarkFieldsEnum;
};


export type MarkdownRemarkGroupConnectionMaxArgs = {
  field: MarkdownRemarkFieldsEnum;
};


export type MarkdownRemarkGroupConnectionMinArgs = {
  field: MarkdownRemarkFieldsEnum;
};


export type MarkdownRemarkGroupConnectionSumArgs = {
  field: MarkdownRemarkFieldsEnum;
};


export type MarkdownRemarkGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: MarkdownRemarkFieldsEnum;
};

export type MarkdownRemarkSortInput = {
  fields: Maybe<Array<Maybe<MarkdownRemarkFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ImageSharpConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ImageSharpEdge>;
  nodes: Array<ImageSharp>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<ImageSharpGroupConnection>;
};


export type ImageSharpConnectionDistinctArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpConnectionMaxArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpConnectionMinArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpConnectionSumArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: ImageSharpFieldsEnum;
};

export type ImageSharpEdge = {
  next: Maybe<ImageSharp>;
  node: ImageSharp;
  previous: Maybe<ImageSharp>;
};

export type ImageSharpFieldsEnum =
  | 'fixed___base64'
  | 'fixed___tracedSVG'
  | 'fixed___aspectRatio'
  | 'fixed___width'
  | 'fixed___height'
  | 'fixed___src'
  | 'fixed___srcSet'
  | 'fixed___srcWebp'
  | 'fixed___srcSetWebp'
  | 'fixed___originalName'
  | 'fluid___base64'
  | 'fluid___tracedSVG'
  | 'fluid___aspectRatio'
  | 'fluid___src'
  | 'fluid___srcSet'
  | 'fluid___srcWebp'
  | 'fluid___srcSetWebp'
  | 'fluid___sizes'
  | 'fluid___originalImg'
  | 'fluid___originalName'
  | 'fluid___presentationWidth'
  | 'fluid___presentationHeight'
  | 'gatsbyImageData'
  | 'original___width'
  | 'original___height'
  | 'original___src'
  | 'resize___src'
  | 'resize___tracedSVG'
  | 'resize___width'
  | 'resize___height'
  | 'resize___aspectRatio'
  | 'resize___originalName'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type ImageSharpGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ImageSharpEdge>;
  nodes: Array<ImageSharp>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<ImageSharpGroupConnection>;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};


export type ImageSharpGroupConnectionDistinctArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpGroupConnectionMaxArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpGroupConnectionMinArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpGroupConnectionSumArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: ImageSharpFieldsEnum;
};

export type ImageSharpSortInput = {
  fields: Maybe<Array<Maybe<ImageSharpFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type MailchimpListContactFilterInput = {
  company: Maybe<StringQueryOperatorInput>;
  address1: Maybe<StringQueryOperatorInput>;
  address2: Maybe<StringQueryOperatorInput>;
  city: Maybe<StringQueryOperatorInput>;
  state: Maybe<StringQueryOperatorInput>;
  zip: Maybe<StringQueryOperatorInput>;
  country: Maybe<StringQueryOperatorInput>;
  phone: Maybe<StringQueryOperatorInput>;
};

export type MailchimpListCampaign_DefaultsFilterInput = {
  from_name: Maybe<StringQueryOperatorInput>;
  from_email: Maybe<StringQueryOperatorInput>;
  subject: Maybe<StringQueryOperatorInput>;
  language: Maybe<StringQueryOperatorInput>;
};

export type MailchimpListStatsFilterInput = {
  member_count: Maybe<IntQueryOperatorInput>;
  unsubscribe_count: Maybe<IntQueryOperatorInput>;
  cleaned_count: Maybe<IntQueryOperatorInput>;
  member_count_since_send: Maybe<IntQueryOperatorInput>;
  unsubscribe_count_since_send: Maybe<IntQueryOperatorInput>;
  cleaned_count_since_send: Maybe<IntQueryOperatorInput>;
  campaign_count: Maybe<IntQueryOperatorInput>;
  campaign_last_sent: Maybe<DateQueryOperatorInput>;
  merge_field_count: Maybe<IntQueryOperatorInput>;
  avg_sub_rate: Maybe<IntQueryOperatorInput>;
  avg_unsub_rate: Maybe<IntQueryOperatorInput>;
  target_sub_rate: Maybe<IntQueryOperatorInput>;
  open_rate: Maybe<FloatQueryOperatorInput>;
  click_rate: Maybe<FloatQueryOperatorInput>;
  last_sub_date: Maybe<DateQueryOperatorInput>;
  last_unsub_date: Maybe<DateQueryOperatorInput>;
};

export type MailchimpList_LinksFilterListInput = {
  elemMatch: Maybe<MailchimpList_LinksFilterInput>;
};

export type MailchimpList_LinksFilterInput = {
  rel: Maybe<StringQueryOperatorInput>;
  href: Maybe<StringQueryOperatorInput>;
  method: Maybe<StringQueryOperatorInput>;
  targetSchema: Maybe<StringQueryOperatorInput>;
  schema: Maybe<StringQueryOperatorInput>;
};

export type MailchimpListConnection = {
  totalCount: Scalars['Int'];
  edges: Array<MailchimpListEdge>;
  nodes: Array<MailchimpList>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<MailchimpListGroupConnection>;
};


export type MailchimpListConnectionDistinctArgs = {
  field: MailchimpListFieldsEnum;
};


export type MailchimpListConnectionMaxArgs = {
  field: MailchimpListFieldsEnum;
};


export type MailchimpListConnectionMinArgs = {
  field: MailchimpListFieldsEnum;
};


export type MailchimpListConnectionSumArgs = {
  field: MailchimpListFieldsEnum;
};


export type MailchimpListConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: MailchimpListFieldsEnum;
};

export type MailchimpListEdge = {
  next: Maybe<MailchimpList>;
  node: MailchimpList;
  previous: Maybe<MailchimpList>;
};

export type MailchimpListFieldsEnum =
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'web_id'
  | 'name'
  | 'contact___company'
  | 'contact___address1'
  | 'contact___address2'
  | 'contact___city'
  | 'contact___state'
  | 'contact___zip'
  | 'contact___country'
  | 'contact___phone'
  | 'permission_reminder'
  | 'use_archive_bar'
  | 'campaign_defaults___from_name'
  | 'campaign_defaults___from_email'
  | 'campaign_defaults___subject'
  | 'campaign_defaults___language'
  | 'notify_on_subscribe'
  | 'notify_on_unsubscribe'
  | 'date_created'
  | 'list_rating'
  | 'email_type_option'
  | 'subscribe_url_short'
  | 'subscribe_url_long'
  | 'beamer_address'
  | 'visibility'
  | 'double_optin'
  | 'has_welcome'
  | 'marketing_permissions'
  | 'stats___member_count'
  | 'stats___unsubscribe_count'
  | 'stats___cleaned_count'
  | 'stats___member_count_since_send'
  | 'stats___unsubscribe_count_since_send'
  | 'stats___cleaned_count_since_send'
  | 'stats___campaign_count'
  | 'stats___campaign_last_sent'
  | 'stats___merge_field_count'
  | 'stats___avg_sub_rate'
  | 'stats___avg_unsub_rate'
  | 'stats___target_sub_rate'
  | 'stats___open_rate'
  | 'stats___click_rate'
  | 'stats___last_sub_date'
  | 'stats___last_unsub_date'
  | '_links'
  | '_links___rel'
  | '_links___href'
  | '_links___method'
  | '_links___targetSchema'
  | '_links___schema'
  | 'statusCode';

export type MailchimpListGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<MailchimpListEdge>;
  nodes: Array<MailchimpList>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max: Maybe<Scalars['Float']>;
  min: Maybe<Scalars['Float']>;
  sum: Maybe<Scalars['Float']>;
  group: Array<MailchimpListGroupConnection>;
  field: Scalars['String'];
  fieldValue: Maybe<Scalars['String']>;
};


export type MailchimpListGroupConnectionDistinctArgs = {
  field: MailchimpListFieldsEnum;
};


export type MailchimpListGroupConnectionMaxArgs = {
  field: MailchimpListFieldsEnum;
};


export type MailchimpListGroupConnectionMinArgs = {
  field: MailchimpListFieldsEnum;
};


export type MailchimpListGroupConnectionSumArgs = {
  field: MailchimpListFieldsEnum;
};


export type MailchimpListGroupConnectionGroupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: MailchimpListFieldsEnum;
};

export type MailchimpListFilterInput = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  web_id: Maybe<IntQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  contact: Maybe<MailchimpListContactFilterInput>;
  permission_reminder: Maybe<StringQueryOperatorInput>;
  use_archive_bar: Maybe<BooleanQueryOperatorInput>;
  campaign_defaults: Maybe<MailchimpListCampaign_DefaultsFilterInput>;
  notify_on_subscribe: Maybe<StringQueryOperatorInput>;
  notify_on_unsubscribe: Maybe<StringQueryOperatorInput>;
  date_created: Maybe<DateQueryOperatorInput>;
  list_rating: Maybe<IntQueryOperatorInput>;
  email_type_option: Maybe<BooleanQueryOperatorInput>;
  subscribe_url_short: Maybe<StringQueryOperatorInput>;
  subscribe_url_long: Maybe<StringQueryOperatorInput>;
  beamer_address: Maybe<StringQueryOperatorInput>;
  visibility: Maybe<StringQueryOperatorInput>;
  double_optin: Maybe<BooleanQueryOperatorInput>;
  has_welcome: Maybe<BooleanQueryOperatorInput>;
  marketing_permissions: Maybe<BooleanQueryOperatorInput>;
  stats: Maybe<MailchimpListStatsFilterInput>;
  _links: Maybe<MailchimpList_LinksFilterListInput>;
  statusCode: Maybe<IntQueryOperatorInput>;
};

export type MailchimpListSortInput = {
  fields: Maybe<Array<Maybe<MailchimpListFieldsEnum>>>;
  order: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type CarbonAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type CarbonAdsQuery = { site: Maybe<{ siteMetadata: Maybe<{ carbonAdsService: Maybe<CarbonAdsServiceAllFragment> }> }> };

export type LayoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LayoutQuery = { file: Maybe<{ childImageSharp: Maybe<Pick<ImageSharp, 'gatsbyImageData'>> }>, site: Maybe<{ siteMetadata: Maybe<{ siteInfo: Maybe<SiteInfoAllFragment>, authorInfo: Maybe<AuthorInfoAllFragment> }> }> };

export type ExcerptsListQueryVariables = Exact<{
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  popularPostsSlugs: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
}>;


export type ExcerptsListQuery = { site: Maybe<{ siteMetadata: Maybe<{ featured: Maybe<{ popularPostsByCategory: Maybe<Array<Maybe<Pick<SiteSiteMetadataFeaturedPopularPostsByCategory, 'category' | 'slugs'>>>> }> }> }>, popularPostsMarkdown: { edges: Array<{ node: { frontmatter: Maybe<(
          { thumbnail: Maybe<{ childImageSharp: Maybe<Pick<ImageSharp, 'gatsbyImageData'>> }> }
          & PostFragment
        )> } }> }, allMarkdownRemark: { edges: Array<{ node: { frontmatter: Maybe<(
          { thumbnail: Maybe<{ childImageSharp: Maybe<Pick<ImageSharp, 'gatsbyImageData'>> }> }
          & PostFragment
        )> } }> } };

export type PlainListByTagQueryVariables = Exact<{
  tag: Scalars['String'];
}>;


export type PlainListByTagQuery = { allMarkdownRemark: { edges: Array<{ node: { frontmatter: Maybe<PostFragment> } }> } };

export type SiteInfoAllFragment = Pick<SiteSiteMetadataSiteInfo, 'title' | 'description' | 'metaTitle' | 'metaDescription' | 'url' | 'repositoryUrl'>;

export type AuthorInfoAllFragment = (
  Pick<SiteSiteMetadataAuthorInfo, 'name' | 'description' | 'email' | 'jobTitle'>
  & { profiles: Maybe<Pick<SiteSiteMetadataAuthorInfoProfiles, 'stackoverflow' | 'twitter' | 'linkedin' | 'github' | 'facebook'>>, nicknames: Maybe<Pick<SiteSiteMetadataAuthorInfoNicknames, 'twitter'>> }
);

export type CarbonAdsServiceAllFragment = Pick<SiteSiteMetadataCarbonAdsService, 'isEnabled' | 'isProductionMode' | 'scriptSrc'>;

export type PostFragment = Pick<MarkdownRemarkFrontmatter, 'title' | 'description' | 'published' | 'modified' | 'slug' | 'tags'>;

export type PostBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
  recommended: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
  popularPostsSlugs: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
}>;


export type PostBySlugQuery = { site: Maybe<{ siteMetadata: Maybe<(
      Pick<SiteSiteMetadata, 'githubCommentsRepository'>
      & { siteInfo: Maybe<SiteInfoAllFragment>, authorInfo: Maybe<AuthorInfoAllFragment>, featured: Maybe<{ popularPostsByCategory: Maybe<Array<Maybe<Pick<SiteSiteMetadataFeaturedPopularPostsByCategory, 'category' | 'slugs'>>>> }> }
    )> }>, authorProfilePicture: Maybe<{ childImageSharp: Maybe<Pick<ImageSharp, 'gatsbyImageData'>> }>, markdownRemark: Maybe<(
    Pick<MarkdownRemark, 'id' | 'html' | 'fileAbsolutePath'>
    & { frontmatter: Maybe<(
      Pick<MarkdownRemarkFrontmatter, 'recommended'>
      & { thumbnail: Maybe<{ childImageSharp: Maybe<Pick<ImageSharp, 'gatsbyImageData'>> }> }
      & PostFragment
    )> }
  )>, recommendedPostsMarkdown: { edges: Array<{ node: { frontmatter: Maybe<PostFragment> } }> }, popularPostsMarkdown: { edges: Array<{ node: { frontmatter: Maybe<PostFragment> } }> } };

export type PopularTagsFetchQueryVariables = Exact<{ [key: string]: never; }>;


export type PopularTagsFetchQuery = { allMarkdownRemark: { edges: Array<{ node: { frontmatter: Maybe<PostFragment> } }> } };

export type EmailSubscriptionQueryVariables = Exact<{ [key: string]: never; }>;


export type EmailSubscriptionQuery = { site: Maybe<{ siteMetadata: Maybe<{ emailSubscriptionService: Maybe<Pick<SiteSiteMetadataEmailSubscriptionService, 'endpoint' | 'hiddenFieldName'>> }> }>, allMailchimpList: { edges: Array<{ node: { stats: Maybe<Pick<MailchimpListStats, 'member_count'>> } }> } };

export type AuthorInfoAndPicturesQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthorInfoAndPicturesQuery = { site: Maybe<{ siteMetadata: Maybe<{ authorInfo: Maybe<AuthorInfoAllFragment>, siteInfo: Maybe<SiteInfoAllFragment> }> }>, authorProfilePicture: Maybe<{ childImageSharp: Maybe<Pick<ImageSharp, 'gatsbyImageData'>> }> };

export type Page404QueryVariables = Exact<{ [key: string]: never; }>;


export type Page404Query = { allMarkdownRemark: { edges: Array<{ node: Pick<MarkdownRemark, 'html'> }> } };

export type AboutQueryVariables = Exact<{ [key: string]: never; }>;


export type AboutQuery = { allMarkdownRemark: { edges: Array<{ node: Pick<MarkdownRemark, 'html'> }> } };

export type PlainListAllQueryVariables = Exact<{ [key: string]: never; }>;


export type PlainListAllQuery = { allMarkdownRemark: { edges: Array<{ node: { frontmatter: Maybe<PostFragment> } }> } };

export type SearchQueryVariables = Exact<{ [key: string]: never; }>;


export type SearchQuery = { site: Maybe<{ siteMetadata: Maybe<Pick<SiteSiteMetadata, 'googleCustomSearchId'>> }> };

export type GatsbyImageSharpFixedFragment = Pick<ImageSharpFixed, 'base64' | 'width' | 'height' | 'src' | 'srcSet'>;

export type GatsbyImageSharpFixed_TracedSvgFragment = Pick<ImageSharpFixed, 'tracedSVG' | 'width' | 'height' | 'src' | 'srcSet'>;

export type GatsbyImageSharpFixed_WithWebpFragment = Pick<ImageSharpFixed, 'base64' | 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>;

export type GatsbyImageSharpFixed_WithWebp_TracedSvgFragment = Pick<ImageSharpFixed, 'tracedSVG' | 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>;

export type GatsbyImageSharpFixed_NoBase64Fragment = Pick<ImageSharpFixed, 'width' | 'height' | 'src' | 'srcSet'>;

export type GatsbyImageSharpFixed_WithWebp_NoBase64Fragment = Pick<ImageSharpFixed, 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>;

export type GatsbyImageSharpFluidFragment = Pick<ImageSharpFluid, 'base64' | 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>;

export type GatsbyImageSharpFluidLimitPresentationSizeFragment = { maxHeight: ImageSharpFluid['presentationHeight'], maxWidth: ImageSharpFluid['presentationWidth'] };

export type GatsbyImageSharpFluid_TracedSvgFragment = Pick<ImageSharpFluid, 'tracedSVG' | 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>;

export type GatsbyImageSharpFluid_WithWebpFragment = Pick<ImageSharpFluid, 'base64' | 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>;

export type GatsbyImageSharpFluid_WithWebp_TracedSvgFragment = Pick<ImageSharpFluid, 'tracedSVG' | 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>;

export type GatsbyImageSharpFluid_NoBase64Fragment = Pick<ImageSharpFluid, 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>;

export type GatsbyImageSharpFluid_WithWebp_NoBase64Fragment = Pick<ImageSharpFluid, 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>;
