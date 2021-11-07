import { Helmet } from 'react-helmet';
import { useAuthorAndSiteInfo } from 'hooks/useAuthorAndSiteInfo';

export function ExcerptsListMetaStructuredData() {
  const { author, site } = useAuthorAndSiteInfo();

  const authorProfilePictureUrl = `${site.url}${author.profilePictureSrc}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    publisher: {
      '@type': 'Organization',
      name: site.metaTitle,
      logo: {
        '@type': 'ImageObject',
        url: authorProfilePictureUrl,
      },
    },
    url: site.url,
    image: {
      '@type': 'ImageObject',
      url: authorProfilePictureUrl,
      width: 256,
      height: 256,
    },
    description: site.description,
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
