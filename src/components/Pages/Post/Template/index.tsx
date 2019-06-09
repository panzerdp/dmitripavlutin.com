import Img from 'gatsby-image';
import * as React from 'react';
import { useInView } from 'react-intersection-observer';

import 'prismjs/themes/prism.css';

import MetaStructuredData from 'components/Pages/Post/Meta/StructuredData';
import MetaTags from 'components/Pages/Post/Meta/Tags';
import Layout from 'components/Layout/Fetch';
import Subheader from 'components/Pages/Common/Subheader';
import Edit from 'components/Pages/Post/Edit';
import RecommendedList from 'components/Pages/Post/Recommended/List';
import ShareBottom from 'components/Pages/Post/Share/Bottom';
import ShareGroupVertical from 'components/Pages/Post/Share/Group/Vertical';
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
  const [ref, coverIsInView] = useInView();
  const postUrl = siteInfo.url + TO_POST({ slug: post.slug });
  console.log(coverIsInView);
  return (
    <>
      <MetaTags post={post} siteInfo={siteInfo} authorInfo={authorInfo} />
      <MetaStructuredData
        post={post}
        siteInfo={siteInfo}
        authorInfo={authorInfo}
        authorProfilePictureSrc={authorProfilePictureSrc}
      />
      <Layout>
        <article>
          <div ref={ref} className={styles.postCover}>
            <Img fluid={post.thumbnail} />
          </div>
          <h1>{post.title}</h1>
          <Subheader tags={post.tags} published={post.published} />
          <ShareGroupVertical url={postUrl} text={post.title} tags={post.tags} show={!coverIsInView} />
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <Edit url={postRepositoryFileUrl} />
          <ShareBottom url={postUrl} text={post.title} tags={post.tags} />
          <RecommendedList posts={recommendedPosts} />
        </article>
      </Layout>
    </>
  );
}
