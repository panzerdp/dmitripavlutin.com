import Layout from 'components/Layout/Fetch';
import AboutMetaTags from 'components/Pages/About/Meta/Tags';
import AboutMetaStructuredData from 'components/Pages/About/Meta/StructuredData';

interface AboutTemplateProps {
  html: string;
  authorInfo: AuthorInfo;
  siteInfo: SiteInfo;
  authorProfilePictureSrc: string;
}

export default function AboutTemplate({ html }: AboutTemplateProps) {
  return (
    <Layout>
      <AboutMetaTags />
      <AboutMetaStructuredData />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}
