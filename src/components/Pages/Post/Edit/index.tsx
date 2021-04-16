import * as styles from './index.module.scss';

interface PostEditProps {
  url: string;
}

export default function PostEdit({ url }: PostEditProps) {
  return (
    <div className={styles.postEdit}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img alt="GitHub Logo" src="/icons/github.svg" />
        <span>Suggest Improvement</span>
      </a>
    </div>
  );
}
