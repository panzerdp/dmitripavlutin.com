import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import R from 'ramda';


const toMetaArticleTag = R.map(function(tag) {
  return <meta property="article:tag" content={tag} key={tag} />;
});


export default function BlogPostMetadata(props) {
  const { data: { markdownRemark: { frontmatter }, site: { siteMetadata } } } = props;
  const postUrl = `${siteMetadata.siteUrl}/${frontmatter.slug}/`;
  const imageUrl = `${siteMetadata.siteUrl}${frontmatter.thumbnail.childImageSharp.sizes.src}`;
  console.log(props);
  return (
    <Helmet>
      <title>{frontmatter.title}</title>
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="canonical" href={postUrl} />
      <meta name="referrer" content="no-referrer-when-downgrade" />

      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={frontmatter.title} />
      <meta property="og:description" content={frontmatter.description} />
      <meta property="og:url" content={postUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="article:published_time" content={frontmatter.published} />
      <meta property="article:modified_time" content={frontmatter.modified} />
      
      {toMetaArticleTag(frontmatter.tags)}

      <meta property="article:author" content={siteMetadata.profiles.facebook} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={frontmatter.title} />
      <meta name="twitter:description" content={frontmatter.description} />
      <meta name="twitter:url" content={postUrl} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content={siteMetadata.author} />
      <meta name="twitter:label2" content="Filed under" />
      <meta name="twitter:data2" content={frontmatter.tags.join(', ')} />
      <meta name="twitter:creator" content={siteMetadata.nicknames.twitter} />
      <meta property="og:image:width" content="720" />
      <meta property="og:image:height" content="400" />
    </Helmet>
  );
}