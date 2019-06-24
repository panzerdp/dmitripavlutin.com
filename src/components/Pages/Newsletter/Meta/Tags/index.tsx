import * as React from 'react';
import Helmet from 'react-helmet';

export default function MetaTags() {
  return (
    <Helmet>
      <title>Newsletter</title>
      <meta name="description" content="Subscribe to newsletter" />
    </Helmet>
  );
}
