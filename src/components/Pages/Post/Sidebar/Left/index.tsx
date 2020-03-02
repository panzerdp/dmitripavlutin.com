import * as React from 'react';
import Media from 'react-media';

import styles from './index.module.scss';

import CarbonAdsFetch from 'components/CarbonAds/Fetch';
import CarbonAdsBanner from 'components/CarbonAds/Banner';
import ShareGroupVertical from 'components/Pages/Post/Share/Group/Vertical';
import { TO_POST } from 'routes/path';

interface PostLeftSidebarProps {
  siteUrl: string;
  post: PostPlain;
  showShareButtons: boolean;
  twitterName: string;
}

export default function PostLeftSidebar({ siteUrl, post, showShareButtons, twitterName }: PostLeftSidebarProps) {
  const postUrl = siteUrl + TO_POST({ slug: post.slug });
  return (
    <div className={styles.leftSidebar}>
      <div className={styles.carbonAdsContainer}>
        <Media query="(min-width: 1201px)" defaultMatches={false}>
          <CarbonAdsFetch render={(service) => <CarbonAdsBanner carbonAdsService={service} />} />
        </Media>
      </div>
      <ShareGroupVertical
        url={postUrl}
        text={post.title}
        tags={post.tags}
        show={showShareButtons}
        twitterName={twitterName}
      />
    </div>
  );
}
