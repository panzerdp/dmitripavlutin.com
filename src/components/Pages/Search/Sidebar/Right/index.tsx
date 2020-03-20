import * as React from 'react';

import styles from './index.module.scss';

import SidebarItemsCommon from 'components/SidebarItems/Common';

export default function SearchRightSidebar() {
  return (
    <div className={styles.rightSidebar}>
      <SidebarItemsCommon />
    </div>
  );
}