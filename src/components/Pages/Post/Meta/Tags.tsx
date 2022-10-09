import { Helmet } from 'react-helmet';

import { TO_POST } from 'routes/path';
import { Post } from 'typings/post';
import { useAuthorAndSiteInfo } from 'hooks/useAuthorAndSiteInfo';

interface PostMetaTagsProps {
  post: Post;
}

export default function PostMetaTags({ post }: PostMetaTagsProps) {
  const { author: { info: authorInfo }, site } = useAuthorAndSiteInfo();

  const postUrl = `${site.url}${TO_POST({ slug: post.slug })}`;
  const imageUrl = `${postUrl}cover.png`;
  return (
    <Helmet titleTemplate="%s">
      <title>{post.title}</title>
      <meta name="description" content={post.description} />
      <link rel="canonical" href={postUrl} />

      <meta property="og:site_name" content={site.metaTitle} />
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

      <meta property="article:author" content={authorInfo.profiles.facebook} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.description} />
      <meta name="twitter:url" content={postUrl} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content={authorInfo.name} />
      <meta name="twitter:label2" content="Filed under" />
      <meta name="twitter:data2" content={post.tags.join(', ')} />
      <meta name="twitter:creator" content={`@${authorInfo.nicknames.twitter}`} />

      <link rel="preconnect" href="https://api.github.com" />
    </Helmet>
  );
}
