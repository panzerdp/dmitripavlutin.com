import Media from 'react-media';

import * as styles from './index.module.scss';

import ShareGroupVertical from 'components/Pages/Post/Share/Group/Vertical';
import CarbonSection from 'components/Carbon/Section';
import { PostPlain } from 'typings/post';

interface PostLeftSidebarProps {
  post: PostPlain;
  showShareButtons: boolean;
}

export default function PostLeftSidebar({ post, showShareButtons }: PostLeftSidebarProps) {
  return (
    <div className={styles.leftSidebar}>
      <Media query="(min-width: 1251px)" defaultMatches={false}>
        <CarbonSection />
      </Media>
      <ShareGroupVertical post={post} show={showShareButtons} />
    </div>
  );
}
