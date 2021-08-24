import * as styles from './index.module.scss';

export default function JobOpportunities() {
  return (
    <div className={styles.jobOpportunities}>
      <h3>
        The author is seeking job opportunities
      </h3>
      <div className={styles.description}>
        <p>
        I&apos;m always interested in challenging projects and job opportunities.
        </p>
        <p>
          If you&apos;re a developer enjoying my posts and you want to refer me to a position, you&apos;re welcome to <a href="mailto:dmitripavlutin@gmail.com">contact me</a>.
        </p>
        <p>
        If you&apos;re a recruiter, you&apos;re welcome to <a href="mailto:dmitripavlutin@gmail.com">contact me</a> with an interesting Frontend job opportunity.
        </p>
      </div>
    </div>
  );
}
