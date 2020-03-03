import * as React from 'react';
import Media from 'react-media';

import styles from './index.module.scss';

import SubscriptionRegion from 'components/Subscription/Region';
import PopularPosts from 'components/Popular/Posts';
import PopularTagsFetch from 'components/Popular/Tags/Fetch';
import PopularTagsList from 'components/Popular/Tags/List';
import AboutAuthorDetailed from 'components/AboutAuthor/Detailed';
import AboutAuthorContact from 'components/AboutAuthor/Contact';
import AboutAuthorFollow from 'components/AboutAuthor/Follow';
import AboutAuthorFetch, { AboutAuthorFetchResult } from 'components/AboutAuthor/Fetch';
import CarbonFetch from 'components/Carbon/Fetch';
import CarbonSection from 'components/Carbon/Section';
import CarbonAd from 'components/Carbon/Ad';

interface PostRightSidebarProps {
  popularPosts: Post<FixedImage>[];
  siteUrl: string;
}

export default function PostRightSidebar({ popularPosts, siteUrl }: PostRightSidebarProps) {
  return (
    <div className={styles.rightSidebar}>
      <SubscriptionRegion />
      <Media query="(min-width: 1201px)" defaultMatches={false}>
        <CarbonFetch render={renderCarbon} />
      </Media>
      <AboutAuthorFetch render={renderAuthorInfo} />
      <PopularPosts posts={popularPosts} siteUrl={siteUrl} />
      <PopularTagsFetch render={renderPosts} />
    </div>
  );
}

function renderCarbon(service: CarbonAdsService): JSX.Element {
  return (
    <CarbonSection>
      <CarbonAd carbonAdsService={service} />
    </CarbonSection>
  );
}

function renderAuthorInfo({ authorInfo, authorProfilePictureBig, authorStats }: AboutAuthorFetchResult): JSX.Element {
  return (
    <>
      <AboutAuthorDetailed authorInfo={authorInfo} authorProfilePicture={authorProfilePictureBig} />
      <AboutAuthorFollow authorInfo={authorInfo} authorStats={authorStats} />
      <AboutAuthorContact authorInfo={authorInfo} />
    </>
  );
}

function renderPosts(posts: PostPlain[]) {
  return <PopularTagsList posts={posts} title="Explore popular tags" limit={20} />;
}