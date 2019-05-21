import * as React from 'react';
import Helmet from 'react-helmet';

interface PostMetaTagsProps {
  post: Post;
  siteMetadata: SiteMetadata;
}

export default function PostMetaTags({ post, siteMetadata }: PostMetaTagsProps) {
  const postUrl = `${siteMetadata.siteUrl}/${post.slug}/`;
  const imageUrl = `${siteMetadata.siteUrl}${post.thumbnail.src}`;
  return (
    <Helmet titleTemplate="%s">
      <title>{post.title}</title>
      <meta name="description" content={post.description} />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="canonical" href={postUrl} />
      <meta name="referrer" content="no-referrer-when-downgrade" />

      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.description} />
      <meta property="og:url" content={postUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="720" />
      <meta property="og:image:height" content="400" />
      <meta property="article:published_time" content={post.published} />
      <meta property="article:modified_time" content={post.modified} />

      {post.tags.map((tag) => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}

      <meta property="article:author" content={siteMetadata.profiles.facebook} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.description} />
      <meta name="twitter:url" content={postUrl} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content={siteMetadata.author} />
      <meta name="twitter:label2" content="Filed under" />
      <meta name="twitter:data2" content={post.tags.join(', ')} />
      <meta name="twitter:creator" content={siteMetadata.nicknames.twitter} />
    </Helmet>
  );
}
