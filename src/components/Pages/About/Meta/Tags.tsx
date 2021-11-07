import { Helmet } from 'react-helmet';

import { useAuthorAndSiteInfo } from 'hooks/useAuthorAndSiteInfo';

export default function AboutMetaTags() {
  const { author } = useAuthorAndSiteInfo();

  return (
    <Helmet>
      <title>About {author.info.name}</title>
      <meta name="description" content={author.info.description} />
    </Helmet>
  );
}
