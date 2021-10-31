import { Helmet } from 'react-helmet';

import { useAuthorAndSideInfo } from 'hooks/useAuthorAndSiteInfo';

export default function AboutMetaTags() {
  const { author } = useAuthorAndSideInfo();

  return (
    <Helmet>
      <title>About {author.info.name}</title>
      <meta name="description" content={author.info.description} />
    </Helmet>
  );
}
