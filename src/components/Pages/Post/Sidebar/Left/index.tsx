import * as styles from './index.module.scss';

import ShareGroupVertical from 'components/Pages/Post/Share/Group/Vertical';
import { TO_POST } from 'routes/path';

interface PostLeftSidebarProps {
  siteInfo: SiteInfo;
  post: PostPlain;
  showShareButtons: boolean;
  twitterName: string;
}

export default function PostLeftSidebar({ siteInfo, post, showShareButtons, twitterName }: PostLeftSidebarProps) {
  const postUrl = siteInfo.url + TO_POST({ slug: post.slug });
  return (
    <div className={styles.leftSidebar}>
      <ShareGroupVertical
        url={postUrl}
        siteInfo={siteInfo}
        text={post.title}
        tags={post.tags}
        show={showShareButtons}
        twitterName={twitterName}
      />
    </div>
  );
}
