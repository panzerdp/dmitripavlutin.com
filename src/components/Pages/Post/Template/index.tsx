import Img from 'gatsby-image';
import * as React from 'react';

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
import CarbondAdsBanner from 'components/CarbonAds/Banner';
import CarbonAdsFetch from 'components/CarbonAds/Fetch';
import CarbonAdsMetaTags from 'components/CarbonAds/Meta/Tags';
import SubscriptionRegion from 'components/Subscription/Region';
import isInView from 'hooks/isInView';
import { TO_POST } from 'routes/path';
import styles from './index.module.scss';

interface PostTemplateProps {
  siteInfo: SiteInfo;
  authorInfo: AuthorInfo;
  postRepositoryFileUrl: string;
  post: Post;
  recommendedPosts: PostExcerpt[];
  authorProfilePictureSrc: string;
}

export default function PostTemplate({
  siteInfo,
  authorInfo,
  postRepositoryFileUrl,
  post,
  recommendedPosts,
  authorProfilePictureSrc,
}: PostTemplateProps) {
  const [ref, showShareButtons] = isInView();
  const postUrl = siteInfo.url + TO_POST({ slug: post.slug });
  const subscription = <SubscriptionRegion />;
  return (
    <Layout
      leftSidebar={<LeftSidebar post={post} siteUrl={siteInfo.url} showShareButtons={showShareButtons} />}
      rightSidebar={<RightSidebar>{subscription}</RightSidebar>}
    >
      <MetaTags post={post} siteInfo={siteInfo} authorInfo={authorInfo} />
      <MetaStructuredData
        post={post}
        siteInfo={siteInfo}
        authorInfo={authorInfo}
        authorProfilePictureSrc={authorProfilePictureSrc}
      />
      <article>
        <div ref={ref} className={styles.postCover}>
          <Img fluid={post.thumbnail} />
        </div>
        <h1>{post.title}</h1>
        <Subheader tags={post.tags} published={post.published} />
        <div className={styles.bannerContainer}>
          <CarbonAdsFetch
            render={({ carbonAdsService }) => (
              <>
                <CarbonAdsMetaTags carbonAdsService={carbonAdsService} />
                <CarbondAdsBanner carbonAdsService={carbonAdsService} className={styles.banner} />
              </>
            )}
          />
        </div>
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
          <div className={styles.bottomSubscriptionForm}>{subscription}</div>
          <Comments url={postUrl} title={post.title} />
        </div>
      </article>
    </Layout>
  );
}
