import { App } from 'app'
import { Helmet } from 'react-helmet'

export default function TermsOfUsePage() {
  return (
    <App>
      <Helmet>
        <title>Terms of Service</title>
        <meta name="description" content="Terms of Service" />
      </Helmet>
      <h1>Terms of Service</h1>
      <p>
        Dmitri Pavlutin (referenced as &quot;author&quot;) operates dmitripavlutin.com blog (referenced as &quot;website&quot;).
        The use of any webpage on the website implies the full acceptance of these terms of service.
      </p>

      <h2>License</h2>
      <p>
        The content of the websited is under <a href="http://creativecommons.org/licenses/by/4.0/" target='_blank' rel="noreferrer">CC BY 4.0</a>. You can copy and redistribute the material in any medium or format but you must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the author endorses you or your use.
      </p>

      <h2>Disclaimer</h2>
      <p>
      The materials on the website are provided "as is". The author makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
      </p>

      <p>
      Further, the author does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on the website or otherwise relating to such materials or on any sites linked to this website.
      </p>

      <h2>Links</h2>

      <p>
      The author has not reviewed all of the other sites linked to the website and is not responsible for the contents of any such linked site.
      The inclusion of any link does not imply endorsement by the author of the other site.
      Use of any such linked site is at your own risk.
      </p>

      <h2>Affiliate Links</h2>

      <p>
        The author may, from time to time, post affiliate links to third party sites on the website. The author is a member of several affiliate purchasing programs, including, without limitation, Traversy Media and Vueschool.
        The author earns a commission on qualifying purchases through these affiliate links.
      </p>

      <h2>Limitations</h2>

      <p>
        In no event shall the author be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on the website, even if the author or the author's authorized representative has been notified orally or in writing of the possibility of such damage.
        Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
      </p>

      <h2>
        Revisions and Errata
      </h2>

      <p>
        The materials appearing on the website could include technical, typographical, or photographic errors. The author does not warrant that any of the materials on the website are accurate, complete, or current.
        The author may make changes to the materials contained on the website at any time without notice. The author does not, however, make any commitment to update the materials.
      </p>

      <h2>
      Terms of Service Modifications
      </h2>

      <p>
      The author may revise these terms of use for the website at any time without notice. By using the website you are agreeing to be bound by the then current version of these terms of service.
      </p>

      <h2>Contact Information</h2>
      <p>
        For any questions or concerns regarding the terms of service,
        please send the author an email at <a href="mailto:dmitripavlutin@gmail.com">dmitripavlutin@gmail.com</a>.
      </p>
    </App>
  )
}
