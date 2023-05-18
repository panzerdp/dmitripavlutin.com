import Layout from 'components/Layout/Fetch'
import AboutMetaTags from 'components/Pages/About/Meta/Tags'
import AboutMetaStructuredData from 'components/Pages/About/Meta/StructuredData'

export default function AboutTemplate() {
  return (
    <Layout>
      <AboutMetaTags />
      <AboutMetaStructuredData />
      <h1>About me</h1>

      <p>My name is Dmitri Pavlutin. I&apos;m a Senior Frontend Developer with 10+ years of experience, having a Master&apos;s Degree in Computer Science.</p>

      <p>Currently, I live in the sunny city of Barcelona (Spain) with my wife and my cat.</p>

      <p>My passion is web applications development: programming, design (UI and UX), automated testing, and good application architecture. I&apos;m skilled at JavaScript, TypeScript, HTML, CSS, including React.js and Vue.js frameworks.</p>

      <p>I have good communication skills (being fluent in written and verbal English) and interpersonal skills. I strive to be a humble team player and be approachable to receive and give feedback.</p>

      <p>On this blog, I publish regularly posts about Frontend development, mainly about JavaScript, TypeScript, Vue.js, and React.js. Writing helps me sharpen my writing skills and learn a lot along the way.</p>

      <p>For any questions or concerns regarding this blog, please send me an email at <a href="mailto:dmitripavlutin@gmail.com">dmitripavlutin@gmail.com</a>.</p>
    </Layout>
  )
}
