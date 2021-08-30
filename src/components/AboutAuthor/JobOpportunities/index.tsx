import * as styles from './index.module.scss';

export default function JobOpportunities() {
  return (
    <div className={styles.jobOpportunities}>
      <h3>
        Contact me
      </h3>
      <div className={styles.description}>
        <p>
          You're welcome to write me an <a href="mailto:dmitripavlutin@gmail.com">email message</a> just to say thanks, refer me to a job, or with an interesting job proposal.
        </p>
        <p>
          If you have a technical question, please write a comment in the corresponding post.
        </p>
      </div>
    </div>
  );
}
