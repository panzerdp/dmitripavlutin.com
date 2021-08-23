import * as styles from './index.module.scss';

export default function JobOpportunities() {
  return (
    <div className={styles.jobOpportunities}>
      <h3>
        Would you like me in your team?
      </h3>
      <div className={styles.description}>
        <p>
        I&apos;m always interested in challenging projects and job opportunities.
        </p>
        <p>
        If you&apos;re a recruiter, you&apos;re welcome to <a href="mailto:dmitripavlutin@gmail.com">contact me</a> with an interesting Frontend job position.
        </p>
        <p>
          If you&apos;re a developer enjoying my posts, you&apos;re welcome to <a href="mailto:dmitripavlutin@gmail.com">contact me</a> to refer me to a Frontend job position in your company.
        </p> 
      </div>
    </div>
  );
}
