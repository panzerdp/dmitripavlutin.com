import { Helmet } from 'react-helmet';

interface AboutMetaStructuredDataProps {
  siteInfo: SiteInfo;
  authorInfo: AuthorInfo;
  authorProfilePictureSrc: string;
}

export default function AboutMetaStructuredData({
  siteInfo,
  authorInfo,
  authorProfilePictureSrc,
}: AboutMetaStructuredDataProps) {
  const authorProfilePictureUrl = `${siteInfo.url}${authorProfilePictureSrc}`;
  const sameAs = Object.keys(authorInfo.profiles).reduce((list, key) => [...list, authorInfo.profiles[key]], []);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: authorInfo.name,
    image: {
      '@type': 'ImageObject',
      url: authorProfilePictureUrl,
      width: 256,
      height: 256,
    },
    url: siteInfo.url,
    sameAs: sameAs,
    description: authorInfo.description,
    jobTitle: authorInfo.jobTitle,
    email: authorInfo.email,
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData, undefined, 2)}</script>
    </Helmet>
  );
}
