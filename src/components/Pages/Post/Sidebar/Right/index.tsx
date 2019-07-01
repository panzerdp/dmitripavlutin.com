import * as React from 'react';

import styles from './index.module.scss';

interface PostRightSidebarProps {
  children: React.ReactNode;
}

export default function PostRightSidebar({ children }: PostRightSidebarProps) {
  return <div className={styles.rightSidebar}>{children}</div>;
}
