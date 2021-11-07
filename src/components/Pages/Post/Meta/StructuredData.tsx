import { Helmet } from 'react-helmet';
import { getSrc } from 'gatsby-plugin-image';

import { useAuthorAndSiteInfo } from 'hooks/useAuthorAndSiteInfo';
import { Post } from 'typings/post';
import { TO_POST } from 'routes/path';

interface PostMetaStructuredDataProps {
  post: Post;
}

export default function PostMetaStructuredData({ post }: PostMetaStructuredDataProps) {
  const { author: { info: authorInfo, profilePictureSrc }, site } = useAuthorAndSiteInfo();

  const postUrl = `${site.url}${TO_POST({ slug: post.slug })}`;
  const postImageUrl = `${site.url}${getSrc(post.thumbnail)}`;
  const authorProfilePictureUrl = `${site.url}${profilePictureSrc}`;
  const sameAs = Object.keys(authorInfo.profiles)
    .reduce((list, key: keyof typeof authorInfo.profiles) => [...list, authorInfo.profiles[key]], []);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    publisher: {
      '@type': 'Organization',
      name: site.metaTitle,
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
      url: site.url,
      sameAs: sameAs,
      description: authorInfo.description,
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
      '@id': site.url,
    },
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData, undefined, 2)}</script>
    </Helmet>
  );
}
