import Img from 'gatsby-image';
import React, { useState } from 'react';
import Observer from 'react-intersection-observer';

import 'prismjs/themes/prism.css';

import Layout from 'components/Layout/Container';
import Subheader from 'components/Pages/Common/Subheader';
import Edit from 'components/Pages/Post/Edit';
import MetaStructuredData from 'components/Pages/Post/Meta/StructuredData';
import MetaTags from 'components/Pages/Post/Meta/Tags';
import RecommendedList from 'components/Pages/Post/Recommended/List';
import ShareBottom from 'components/Pages/Post/Share/Bottom';
import ShareGroupVertical from 'components/Pages/Post/Share/Group/Vertical';
import { TO_POST } from 'routes/path';
import styles from './index.module.scss';

interface PostTemplateProps {
  siteMetadata: SiteMetadata;
  postRepositoryFileUrl: string;
  post: Post;
  recommendedPosts: PostExcerpt[];
  authorProfilePicture: FluidImage;
}

export default function PostTemplate({
  siteMetadata,
  postRepositoryFileUrl,
  post,
  recommendedPosts,
  authorProfilePicture,
}: PostTemplateProps) {
  const [coverIsInView, setCoverIsInView] = useState(true);
  const postUrl = siteMetadata.siteUrl + TO_POST({ slug: post.slug });
  return (
    <Layout>
      <article>
        <MetaTags post={post} siteMetadata={siteMetadata} />
        <MetaStructuredData post={post} siteMetadata={siteMetadata} authorProfilePicture={authorProfilePicture} />
        <Observer onChange={(inView) => setCoverIsInView(inView)}>
          <div className={styles.postCover}>
            <Img fluid={post.thumbnail} />
          </div>
        </Observer>
        <h1>{post.title}</h1>
        <Subheader tags={post.tags} published={post.published} />
        <ShareGroupVertical
          url={postUrl}
          text={post.title}
          tags={post.tags}
          className={coverIsInView ? styles.hidePostCover : ''}
        />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <Edit url={postRepositoryFileUrl} />
        <ShareBottom url={postUrl} text={post.title} tags={post.tags} />
        <RecommendedList posts={recommendedPosts} />
      </article>
    </Layout>
  );
}
