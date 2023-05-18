import Layout from 'components/Layout/Fetch'
import { PrivacyPolicyTags } from './PrivacyPolicyTags'

export function PrivacyPolicyTemplate() {
  return (
    <Layout>
      <PrivacyPolicyTags />
      <h1>Privacy Policy</h1>
      <p>
   Dmitri Pavlutin operates the website &quot;Dmitri Pavlutin Blog&quot; at dmitripavlutin.com.
   I take your privacy seriously. To better protect your privacy,
   I provide this privacy policy notice explaining the way your personal information
   is collected and used.
      </p>
      <h3>Collection of Routine Information</h3>
      <p>
   This website tracks basic information about its visitors.
   This information includes, but is not limited to, IP addresses, browser details,
   timestamps and referring pages. None of this information can personally identify specific
   visitors to this website. The information is tracked for routine
   administration and maintenance purposes.
      </p>
      <h3>Cookies</h3>
      <p>
   Where necessary, this website uses cookies to store information about a visitor’s
   preferences and history to better serve the visitor and/or present the
   visitor with customized content.
      </p>
      <h3>Advertisement and Other Third Parties</h3>
      <p>
   Advertising partners and other third parties may use cookies, scripts and/or web beacons to track
   visitor activities on this website to display advertisements
   and other useful information. Such tracking is done directly by the third parties through their
   servers and is subject to their privacy policies. This website has no access or
   control over these cookies, scripts and/or web beacons that may be used by third parties.
      </p>
      <div>
        <p>
      I have included links on this website for your use and reference.
      I am not responsible for the privacy policies on these websites. You
      should be aware that the privacy policies of these websites may differ from my own.
        </p>
        <p>
      Link to the privacy policy of third-party service providers used
      by the website
        </p>
        <ul>
          <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Analytics</a></li>
          <li><a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
      </div>
      <h3>Security</h3>
      <p>
   The security of your personal information is important to me, but remember that no
   method of transmission over the Internet, or method of electronic storage, is 100% secure.
   While I strive to use commercially acceptable means to protect your personal information,
   I cannot guarantee its absolute security.
      </p>
      <h3>Changes To This Privacy Policy</h3>
      <p>
   This Privacy Policy is effective as of 2023-05-18 and will remain in effect except concerning
   any changes in its provisions in the future, which will be in effect immediately after being posted on this
   page. I reserve the right to update or change my Privacy Policy at any time and
   you should check this Privacy Policy periodically. If I make any material changes to this Privacy
   Policy, I will notify you either through the email address you have provided me or by
   placing a prominent notice on my website.
      </p>
      <h3>Contact Information</h3>
      <p>
   For any questions or concerns regarding the privacy policy,
   please send me an email at <a href="mailto:dmitripavlutin@gmail.com">dmitripavlutin@gmail.com</a>.
      </p>
    </Layout>
  )
}
