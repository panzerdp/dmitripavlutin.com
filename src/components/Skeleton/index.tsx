import * as React from 'react';
import classNames from 'utils/classnames';

import styles from './index.module.scss';

const SkeletonAnimation = (): JSX.Element => <div className={classNames(styles.skeleton, styles.fill)} />;

export { SkeletonAnimation };
