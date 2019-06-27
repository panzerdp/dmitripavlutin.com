import Img from 'gatsby-image';
import * as React from 'react';
import { useInView } from 'react-intersection-observer';

import 'prismjs/themes/prism.css';
import 'intersection-observer';

import MetaStructuredData from 'components/Pages/Post/Meta/StructuredData';
import MetaTags from 'components/Pages/Post/Meta/Tags';
import Layout from 'components/Layout/Fetch';
import Subheader from 'components/Subheader';
import Edit from 'components/Pages/Post/Edit';
import RecommendedList from 'components/Pages/Post/Recommended/List';
import ShareBottom from 'components/Pages/Post/Share/Bottom';
import ShareGroupVertical from 'components/Pages/Post/Share/Group/Vertical';
import Comments from 'components/Pages/Post/Comments';
import AboutAuthor from 'components/Pages/Post/AboutAuthor';
import CarbondAdsBanner from 'components/CarbonAds/Banner';
import { TO_POST } from 'routes/path';
import styles from './index.module.scss';

interface PostTemplateProps {
  siteInfo: SiteInfo;
  authorInfo: AuthorInfo;
  carbonAdsService: CarbonAdsService;
  postRepositoryFileUrl: string;
  post: Post;
  recommendedPosts: PostExcerpt[];
  authorProfilePictureSrc: string;
}

export default function PostTemplate({
  siteInfo,
  authorInfo,
  carbonAdsService,
  postRepositoryFileUrl,
  post,
  recommendedPosts,
  authorProfilePictureSrc,
}: PostTemplateProps) {
  const [ref, , record] = useInView();
  let showShareButtons = false;
  if (record != null && !record.isIntersecting) {
    showShareButtons = true;
  }
  const postUrl = siteInfo.url + TO_POST({ slug: post.slug });
  return (
    <Layout>
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
          <CarbondAdsBanner carbonAdsService={carbonAdsService} className={styles.banner} />
        </div>
        <ShareGroupVertical url={postUrl} text={post.title} tags={post.tags} show={showShareButtons} />
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
          <Comments url={postUrl} title={post.title} />
        </div>
      </article>
    </Layout>
  );
}
