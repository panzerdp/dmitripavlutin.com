import { Helmet } from 'react-helmet';

interface AboutMetaTagsProps {
  authorInfo: AuthorInfo;
}

export default function AboutMetaTags({ authorInfo }: AboutMetaTagsProps) {
  return (
    <Helmet>
      <title>About {authorInfo.name}</title>
      <meta name="description" content={authorInfo.description} />
    </Helmet>
  );
}
