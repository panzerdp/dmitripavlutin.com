import Layout from 'components/Layout/Fetch';
import AboutMetaTags from 'components/Pages/About/Meta/Tags';
import AboutMetaStructuredData from 'components/Pages/About/Meta/StructuredData';

interface AboutTemplateProps {
  html: string;
  authorInfo: AuthorInfo;
  siteInfo: SiteInfo;
  authorProfilePictureSrc: string;
}

export default function AboutTemplate({ html, authorInfo, siteInfo, authorProfilePictureSrc }: AboutTemplateProps) {
  return (
    <Layout>
      <AboutMetaTags authorInfo={authorInfo} />
      <AboutMetaStructuredData
        authorInfo={authorInfo}
        siteInfo={siteInfo}
        authorProfilePictureSrc={authorProfilePictureSrc}
      />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}
