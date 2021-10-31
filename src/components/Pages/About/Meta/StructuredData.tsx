import { Helmet } from 'react-helmet';

import { useAuthorAndSideInfo } from 'hooks/useAuthorAndSiteInfo';

export default function AboutMetaStructuredData() {
  const { author, site } = useAuthorAndSideInfo();
  const authorProfilePictureUrl = `${site.url}${author.profilePictureSrc}`;
  const sameAs = Object.keys(author.info.profiles)
    .reduce((list, key: keyof typeof author.info.profiles) => [...list, author.info.profiles[key]], []);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.info.name,
    image: {
      '@type': 'ImageObject',
      url: authorProfilePictureUrl,
      width: 256,
      height: 256,
    },
    url: site.url,
    sameAs: sameAs,
    description: author.info.description,
    jobTitle: author.info.jobTitle,
    email: author.info.email,
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData, undefined, 2)}</script>
    </Helmet>
  );
}
