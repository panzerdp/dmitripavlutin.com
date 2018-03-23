import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

export default function BlogPostMetadata(props) {
  const { data: { markdownRemark: { frontmatter }, site: { siteMetadata } } } = props;
  return (
    <Helmet>
      <title>{frontmatter.title}</title>
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="canonical" href="https://dmitripavlutin.com/object-rest-spread-properties-javascript/" />
      <meta name="referrer" content="no-referrer-when-downgrade" />

      <meta property="og:site_name" content="Dmitri Pavlutin Blog" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content="An easy guide to object rest/spread properties in JavaScript" />
      <meta property="og:description" content="Object spread allows easily to clone, merge, extend objects. While object rest collects rest of properties after destructuring." />
      <meta property="og:url" content="https://dmitripavlutin.com/object-rest-spread-properties-javascript/" />
      <meta property="og:image" content="https://dmitripavlutin.com/content/images/2017/08/07d5ecc752ef92b61669bb51150f8285-1.jpg" />
      <meta property="article:published_time" content="2018-01-03T14:46:18.000Z" />
      <meta property="article:modified_time" content="2018-01-09T17:49:58.000Z" />
      <meta property="article:tag" content="object literal" />
      <meta property="article:tag" content="object initializer" />
      <meta property="article:tag" content="object spread" />
      <meta property="article:tag" content="object rest" />

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