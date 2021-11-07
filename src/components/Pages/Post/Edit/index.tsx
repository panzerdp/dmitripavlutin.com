import { useAuthorAndSiteInfo } from 'hooks/useAuthorAndSiteInfo';
import * as styles from './index.module.scss';

interface PostEditProps {
  postRelativePath: string;
}

export default function PostEdit({ postRelativePath }: PostEditProps) {
  const { site } = useAuthorAndSiteInfo();
    
  const postRepositoryFileUrl = `${site.repositoryUrl}/edit/master/${postRelativePath}`;

  return (
    <div className={styles.postEdit}>
      <a href={postRepositoryFileUrl} target="_blank" rel="noopener noreferrer">
        <img alt="GitHub Logo" src="/icons/github.svg" />
        <span>Suggest Improvement</span>
      </a>
    </div>
  );
}
