import * as React from 'react';

import styles from './index.module.scss';

interface CarbonSectionProps {
  children: React.ReactNode;
}

export default function CarbonSection(props: CarbonSectionProps): JSX.Element {
  return (
    <div className={styles.carbonSection}>
      {props.children}
    </div>
  );
}