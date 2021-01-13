import * as React from 'react';
import { SkeletonAnimation } from 'components/Skeleton';
import classNames from 'utils/classnames';

import styles from './index.module.scss';

const Comment = (): JSX.Element => (
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
