import * as styles from './index.module.scss';

export default function JobOpportunities() {
  return (
    <div className={styles.jobOpportunities}>
      <h3>
        Would you like me in your team?
      </h3>
      <div className={styles.description}>
        <p>
        I'm always interested in challenging projects and job opportunities.
        </p>
        <p>
        If you're a recruiter, you're welcome to <a href="mailto:dmitripavlutin@gmail.com">contact me</a> with an interesting Frontend job position.
        </p>
        <p>
          If you're a developer enjoying my posts, you're welcome to <a href="mailto:dmitripavlutin@gmail.com">contact me</a> if you want to refer me to a position.
        </p> 
      </div>
    </div>
  );
}
