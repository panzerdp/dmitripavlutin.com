import classNames from 'classnames';

import styles from './index.module.scss';

export function SkeletonAnimation (): JSX.Element {
  return <div className={classNames(styles.skeleton, styles.fill)} />;
}