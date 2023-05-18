import Layout from 'components/Layout/Fetch'
import { Helmet } from 'react-helmet'

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <Helmet>
        <title>Contact</title>
        <meta name="description" content="Contact" />
      </Helmet>
      <h1>Contact</h1>
      <p>
        Dmitri Pavlutin operates dmitripavlutin.com blog.
      </p>

      <p>
        For any questions or concerns regarding the blog,
        please send me an email at <a href="mailto:dmitripavlutin@gmail.com">dmitripavlutin@gmail.com</a>.
      </p>
    </Layout>
  )
}
