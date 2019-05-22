import * as React from 'react';
import Helmet from 'react-helmet';

import { TO_POST } from 'routes/path';

interface PostMetaStructuredDataProps {
  post: Post;
  siteInfo: SiteInfo;
  authorInfo: AuthorInfo;
  authorProfilePicture: FluidImage;
}

export default function PostMetaStructuredData({
  post,
  siteInfo,
  authorInfo,
  authorProfilePicture,
}: PostMetaStructuredDataProps) {
  const postUrl = `${siteInfo.url}/${TO_POST({ slug: post.slug })}`;
  const postImageUrl = `${siteInfo.url}${post.thumbnail.src}`;
  const authorProfilePictureUrl = `${siteInfo.url}${authorProfilePicture.src}`;
  const sameAs = Object.keys(authorInfo.profiles).reduce((list, key) => [...list, authorInfo.profiles[key]], []);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    publisher: {
      '@type': 'Organization',
      name: siteInfo.title,
      logo: {
        '@type': 'ImageObject',
        url: authorProfilePictureUrl,
      },
    },
    author: {
      '@type': 'Person',
      name: authorInfo.name,
      image: {
        '@type': 'ImageObject',
        url: authorProfilePictureUrl,
        width: 256,
        height: 256,
      },
      url: siteInfo.url,
      sameAs: sameAs,
      description: authorInfo.speciality,
    },
    headline: post.title,
    url: postUrl,
    datePublished: post.published,
    dateModified: post.modified,
    image: {
      '@type': 'ImageObject',
      url: postImageUrl,
      width: 720,
      height: 400,
    },
    keywords: post.tags.join(', '),
    description: post.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': siteInfo.url,
    },
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData, undefined, 2)}</script>
    </Helmet>
  );
}
