import Img from 'gatsby-image';
import * as React from 'react';
import Media from 'react-media';

import 'prismjs/themes/prism.css';
import 'intersection-observer';

import MetaStructuredData from 'components/Pages/Post/Meta/StructuredData';
import MetaTags from 'components/Pages/Post/Meta/Tags';
import Layout from 'components/Layout/Fetch';
import Subheader from 'components/Subheader';
import Edit from 'components/Pages/Post/Edit';
import LeftSidebar from 'components/Pages/Post/Sidebar/Left';
import RightSidebar from 'components/Pages/Post/Sidebar/Right';
import RecommendedList from 'components/Pages/Post/Recommended/List';
import ShareBottom from 'components/Pages/Post/Share/Bottom';
import Comments from 'components/Pages/Post/Comments';
import AboutAuthor from 'components/Pages/Post/AboutAuthor';
import SubscriptionRegion from 'components/Subscription/Region';
import CarbonAdsFetch from 'components/CarbonAds/Fetch';
import CarbonAdsBanner from 'components/CarbonAds/Banner';
import CarbonAdsMetaTags from 'components/CarbonAds/Meta/Tags';
import isInView from 'hooks/isInView';
import { TO_POST } from 'routes/path';
import styles from './index.module.scss';

interface PostTemplateProps {
  siteInfo: SiteInfo;
  authorInfo: AuthorInfo;
  postRepositoryFileUrl: string;
  post: Post;
  recommendedPosts: PostExcerpt[];
  popularPosts: PostPlain[];
  authorProfilePictureSrc: string;
}

export default function PostTemplate({
  siteInfo,
  authorInfo,
  postRepositoryFileUrl,
  post,
  recommendedPosts,
  popularPosts,
  authorProfilePictureSrc,
}: PostTemplateProps) {
  const [ref, showShareButtons] = isInView();
  const postUrl = siteInfo.url + TO_POST({ slug: post.slug });
  const leftSidebar = <LeftSidebar post={post} siteUrl={siteInfo.url} showShareButtons={showShareButtons} />;
  const rightSidebar = <RightSidebar popularPosts={popularPosts} />;
  return (
    <Layout leftSidebar={leftSidebar} rightSidebar={rightSidebar}>
      <MetaTags post={post} siteInfo={siteInfo} authorInfo={authorInfo} />
      <MetaStructuredData
        post={post}
        siteInfo={siteInfo}
        authorInfo={authorInfo}
        authorProfilePictureSrc={authorProfilePictureSrc}
      />
      <CarbonAdsFetch render={(service) => <CarbonAdsMetaTags carbonAdsService={service} />} />
      <article>
        <div ref={ref} className={styles.postCover}>
          <Img fluid={post.thumbnail} />
        </div>
        <h1>{post.title}</h1>
        <Subheader tags={post.tags} published={post.published} />
        <Media query="(max-width: 1200px)" defaultMatches={false}>
          <div className={styles.bannerContainer}>
            <CarbonAdsFetch render={(service) => <CarbonAdsBanner carbonAdsService={service} />} />
          </div>
        </Media>
        <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className={styles.shareGroup}>
          <div className={styles.shareBottom}>
            <ShareBottom url={postUrl} text={post.title} tags={post.tags} />
          </div>
          <div className={styles.postEdit}>
            <Edit url={postRepositoryFileUrl} />
          </div>
        </div>
        <AboutAuthor authorInfo={authorInfo} authorProfilePictureSrc={authorProfilePictureSrc} />
        <div className={styles.delimiter}>
          <RecommendedList posts={recommendedPosts} />
        </div>
        <div className={styles.delimiter}>
          <div className={styles.bottomSubscriptionForm}>
            <SubscriptionRegion />
          </div>
          <Comments url={postUrl} title={post.title} />
        </div>
      </article>
    </Layout>
  );
}
