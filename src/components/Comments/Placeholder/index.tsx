import { SkeletonAnimation } from 'components/Skeleton';
import classNames from 'classnames';

import styles from './index.module.scss';

function Comment(): JSX.Element {
  return (
    <div className={styles.root}>
      <div className={styles.avatar}></div>
      <div className={styles.comment}>
        <div className={styles.header} />
        <div className={classNames(styles.text, styles.textLine60)} />
        <div className={classNames(styles.text, styles.textLine100)} />
        <div className={classNames(styles.text, styles.textLine70)} />
        <div className={classNames(styles.text, styles.textLine100)} />
        <SkeletonAnimation />
      </div>
      <SkeletonAnimation />
    </div>
  );
}

export function Placeholder(): JSX.Element {
  return (
    <>
      <Comment />
      <Comment />
      <Comment />
    </>
  );
}

export default Placeholder;
