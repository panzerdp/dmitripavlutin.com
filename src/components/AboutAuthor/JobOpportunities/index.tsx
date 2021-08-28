import * as styles from './index.module.scss';

export default function JobOpportunities() {
  return (
    <div className={styles.jobOpportunities}>
      <h3>
        I'm interested in job opportunities
      </h3>
      <div className={styles.description}>
        <p>
          If you&apos;re a developer enjoying my posts and you want to refer me to a position in your company, then please <a href="mailto:dmitripavlutin@gmail.com">contact me</a>.
        </p>
        <p>
        If you&apos;re a recruiter and you have a job opportinity that might interest me, you&apos;re also welcome to <a href="mailto:dmitripavlutin@gmail.com">contact me</a>.
        </p>
      </div>
    </div>
  );
}
