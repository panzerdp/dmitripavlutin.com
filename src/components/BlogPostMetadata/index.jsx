import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import R from 'ramda';


const toMetaArticleTag = R.map(function(tag) {
  return <meta property="article:tag" content={tag} key={tag} />;
});


export default function BlogPostMetadata(props) {
  const { data: { markdownRemark: { frontmatter }, site: { siteMetadata } } } = props;
  const postUrl = `${siteMetadata.siteUrl}${frontmatter.slug}/`;
  console.log(frontmatter);
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
      <meta property="og:image" content="https://dmitripavlutin.com/content/images/2017/08/07d5ecc752ef92b61669bb51150f8285-1.jpg" />
      <meta property="article:published_time" content={frontmatter.published} />
      <meta property="article:modified_time" content={frontmatter.modified} />
      
      {toMetaArticleTag(frontmatter.tags)}

      <meta property="article:author" content="https://www.facebook.com/dmitri.pavlutin" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="An easy guide to object rest/spread properties in JavaScript" />
      <meta name="twitter:description" content="Object spread allows easily to clone, merge, extend objects. While object rest collects rest of properties after destructuring." />
      <meta name="twitter:url" content="https://dmitripavlutin.com/object-rest-spread-properties-javascript/" />
      <meta name="twitter:image" content="https://dmitripavlutin.com/content/images/2017/08/07d5ecc752ef92b61669bb51150f8285-1.jpg" />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content="Dmitri Pavlutin" />
      <meta name="twitter:label2" content="Filed under" />
      <meta name="twitter:data2" content="object literal, object initializer, object spread, object rest" />
      <meta name="twitter:creator" content="@panzerdp" />
      <meta property="og:image:width" content="1022" />
      <meta property="og:image:height" content="381" />
    </Helmet>
  );
}