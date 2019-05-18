import React from 'react';
import Helmet from 'react-helmet';

interface PostMetaStructuredDataProps {
  post: Post;
  siteMetadata: SiteMetadata;
  authorProfilePicture: FluidImage
}

export default function PostMetaStructuredData({ post, siteMetadata, authorProfilePicture }: PostMetaStructuredDataProps) {
  const postUrl = `${siteMetadata.siteUrl}/${post.slug}/`;
  const postImageUrl = `${siteMetadata.siteUrl}${post.thumbnail.src}`;
  const authorProfilePictureUrl = `${siteMetadata.siteUrl}${authorProfilePicture.src}`;
  const sameAs = Object.keys(siteMetadata.profiles).reduce((sameAs, key) => [...sameAs, siteMetadata.profiles[key]], []);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "publisher": {
      "@type": "Organization",
      "name": siteMetadata.title,
      "logo": {
        "@type": "ImageObject",
        "url": authorProfilePictureUrl
      }
    },
    "author": {
      "@type": "Person",
      "name": siteMetadata.author,
      "image": {
        "@type": "ImageObject",
        "url": authorProfilePictureUrl,
        "width": 256,
        "height": 256
      },
      "url": siteMetadata.siteUrl,
      "sameAs": sameAs,
      "description": siteMetadata.speciality
    },
    "headline": post.title,
    "url": postUrl,
    "datePublished": post.published,
    "dateModified": post.modified,
    "image": {
      "@type": "ImageObject",
      "url": postImageUrl,
      "width": 720,
      "height": 400
    },
    "keywords": post.tags.join(', '),
    "description": post.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": siteMetadata.siteUrl
    }
  };
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData, undefined, 2)}
      </script>
    </Helmet>
  );
}