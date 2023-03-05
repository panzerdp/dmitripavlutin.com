import Layout from 'components/Layout/Fetch';
import AboutMetaTags from 'components/Pages/About/Meta/Tags';
import AboutMetaStructuredData from 'components/Pages/About/Meta/StructuredData';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

export default function AboutTemplate() {
  const data = useStaticQuery(
    graphql`
      query AboutPictureQuery {
        aboutPicture: file(relativePath: { eq: "dmitri-pavlutin-seine-4.jpg" }) {
          childImageSharp {
            gatsbyImageData(width: 600, quality: 60, layout: CONSTRAINED, formats: [WEBP])
          }
        }
      }
    `
  );
  
  return (
    <Layout>
      <AboutMetaTags />
      <AboutMetaStructuredData />
      <h1>About me</h1>

      <p>My name is Dmitri Pavlutin.</p>

      <p>I write about frontend development, mainly about JavaScript, TypeScript, and React.js. Writing helps me sharpen my written communication skills and stay in touch with software technology progress.</p>

      <GatsbyImage alt="Dmitri Pavlutin photo" image={data.aboutPicture.childImageSharp.gatsbyImageData} />
    </Layout>
  );
}
