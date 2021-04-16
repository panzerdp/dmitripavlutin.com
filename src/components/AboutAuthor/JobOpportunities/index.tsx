import * as styles from './index.module.scss';

export default function JobOpportunities({ authorInfo }: { authorInfo: AuthorInfo }) {
  return (
    <div className={styles.jobOpportunities}>
      <h3>Looking for a Frontend Developer?</h3>
      <div className={styles.description}>
        <p>
          I'm always interested in learning new technologies, participate in new projects, and face challenges.  
        </p>
        <p>
          I'm looking for interesting Frontend (JavaScript, TypeScript, React, CSS) job opportunities in London, United Kingdom. 
        </p>
        <p>
          If you'd like me to be a part of your Frontend team, please <a href={`mailto:${authorInfo.email}`}>contact me</a>.  
        </p>
      </div>
    </div>
  );
}
