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
      <p>
        Dmitri Pavlutin (referenced as &quot;author&quot;) operates dmitripavlutin.com blog (referenced as &quot;website&quot;).
        The use of any webpage on the website implies the full acceptance of these terms of use.
      </p>

      <h3>License</h3>
      <p>
        The content of the websited is under <a href="http://creativecommons.org/licenses/by/4.0/" target='_blank' rel="noreferrer">CC BY 4.0</a>. You can copy and redistribute the material in any medium or format but you must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the author endorses you or your use.
      </p>

      <h3>Disclaimer</h3>
      <p>
      The materials on the website are provided "as is". The author makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
      Further, the author does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site.
      </p>

      <h3>Links</h3>

      <p>
      The author has not reviewed all of the sites linked to its Internet web site and is not responsible for the contents of any such linked site.
      The inclusion of any link does not imply endorsement by the author of the website.
      Use of any such linked web site is at your own risk.
      </p>



      <h3>Contact Information</h3>
      <p>
   For any questions or concerns regarding the terms and conditions,
   please send the author an email at <a href="mailto:dmitripavlutin@gmail.com">dmitripavlutin@gmail.com</a>.
      </p>
    </Layout>
  )
}
