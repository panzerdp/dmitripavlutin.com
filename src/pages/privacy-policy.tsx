import Layout from 'components/Layout/Fetch'
import { Helmet } from 'react-helmet'

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy</title>
        <meta name="description" content="Privacy Policy" />
      </Helmet>
      <h1>Privacy Policy</h1>
      <p>
   Dmitri Pavlutin (referenced as &quot;author&quot;) operates dmitripavlutin.com blog (referenced as &quot;website&quot;).
   The author takes your privacy seriously. To better protect your privacy,
   the author provides this privacy policy notice explaining the way your personal information
   is collected and used.
      </p>
      <h2>Collection of Routine Information</h2>
      <p>
   This website tracks basic information about its visitors.
   This information includes, but is not limited to, browser details,
   timestamps and referring pages. None of this information can personally identify specific
   visitors to this website. The information is tracked for routine
   administration and maintenance purposes.
      </p>
      <h2>Cookies</h2>
      <p>
   Where necessary, this website uses cookies to store information about a visitor’s
   preferences and history to better serve the visitor and/or present the
   visitor with customized content.
      </p>
      <h2>Advertisement and Other Third Parties</h2>
      <p>
   Advertising partners and other third parties may use cookies, scripts and/or web beacons to track
   visitor activities on this website to display advertisements
   and other useful information. Such tracking is done directly by the third parties through their
   servers and is subject to their privacy policies. This website has no access or
   control over these cookies, scripts and/or web beacons that may be used by third parties.
      </p>
      <div>
        <p>
      The author have included links on this website for your use and reference.
      The author is not responsible for the privacy policies on these websites. You
      should be aware that the privacy policies of these websites may differ from this website.
        </p>
        <p>
      Link to the privacy policy of third-party service providers used by the website:
        </p>
        <ul>
          <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Analytics</a></li>
          <li><a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://www.buysellads.com/privacy" target="_blank" rel="noopener noreferrer">BuySellAds</a></li>
        </ul>
      </div>
      <h2>Security</h2>
      <p>
   The security of your personal information is important to the author, but remember that no
   method of transmission over the Internet, or method of electronic storage, is 100% secure.
   While the author strives to use commercially acceptable means to protect your personal information,
   the author cannot guarantee its absolute security.
      </p>
      <h2>Privacy Policy Modifications</h2>
      <p>
   This Privacy Policy is effective as of 2023-05-18 and will remain in effect except concerning
   any changes in its provisions in the future, which will be in effect immediately after being posted on this
   page. The author reserves the right to update or change this Privacy Policy at any time and
   you should check this Privacy Policy periodically.
      </p>
      <h2>Contact Information</h2>
      <p>
   For any questions or concerns regarding the privacy policy, please send the author an email at <a href="mailto:dmitripavlutin@gmail.com">dmitripavlutin@gmail.com</a>.
      </p>
    </Layout>
  )
}
