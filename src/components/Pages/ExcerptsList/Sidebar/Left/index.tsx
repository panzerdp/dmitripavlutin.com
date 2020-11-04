import Media from 'react-media';

import styles from './index.module.scss';

import CardonSection from 'components/Carbon/Section';

export default function ExcerptsListLeftSidebar() {
  return (
    <div className={styles.leftSidebar}>
      <Media query="(min-width: 1251px)" defaultMatches={false}>
        <CardonSection />
      </Media>
    </div>
  );
}
