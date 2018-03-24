import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import R from 'ramda';

export default function PostMetaStructuredData(props) {
  const { data: { markdownRemark: { frontmatter }, site: { siteMetadata }, authorProfilePicture } } = props;
  const postUrl = `${siteMetadata.siteUrl}/${frontmatter.slug}/`;
  const postImageUrl = `${siteMetadata.siteUrl}${frontmatter.thumbnail.childImageSharp.sizes.src}`;
  const authorProfilePictureUrl = `${siteMetadata.siteUrl}${authorProfilePicture.childImageSharp.resize.src}`;
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
        "width": 128,
        "height": 128
      },
      "url": siteMetadata.siteUrl,
      "sameAs": R.values(siteMetadata.profiles),
      "description": siteMetadata.speciality
    },
    "headline": frontmatter.title,
    "url": postUrl,
    "datePublished": frontmatter.published,
    "dateModified": frontmatter.modified,
    "image": {
      "@type": "ImageObject",
      "url": postImageUrl,
      "width": 720,
      "height": 400
    },
    "keywords": frontmatter.tags.join(', '),
    "description": frontmatter.description,
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