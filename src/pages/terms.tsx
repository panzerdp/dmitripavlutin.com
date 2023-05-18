import Layout from 'components/Layout/Fetch'
import { Helmet } from 'react-helmet'

export default function TermsAndConditionsPage() {
  return (
    <Layout>
      <Helmet>
        <title>Terms and Conditions</title>
        <meta name="description" content="Terms and Conditions" />
      </Helmet>
      <h1>Terms and Conditions</h1>

      <h3>Contact Information</h3>
      <p>
   For any questions or concerns regarding the terms and conditions,
   please send me an email at <a href="mailto:dmitripavlutin@gmail.com">dmitripavlutin@gmail.com</a>.
      </p>
    </Layout>
  )
}
