import React, { useState } from 'react';

import 'prismjs/themes/prism.css';
import 'intersection-observer';

import styles from './index.module.scss';
import Subheader from 'components/Pages/Common/Subheader';
import MetaTags from 'components/Pages/Post/Meta/Tags';
import MetaStructuredData from 'components/Pages/Post/Meta/StructuredData';
import ShareGroupVertical from 'components/Pages/Post/Share/Group/Vertical';
import Cover from 'components/Pages/Post/Cover';
import Edit from 'components/Pages/Post/Edit';
import ShareBottom from 'components/Pages/Post/Share/Bottom';
import RecommendedList from 'components/Pages/Post/Recommended/List';
import { TO_POST } from 'routes/path';
import Layout from 'components/Layout/Container';

interface PostTemplateProps {
  siteMetadata: SiteMetadata;
  postRepositoryFileUrl: string;
  post: Post,
  recommendedPosts: RecommendedPost[]
}

export default function PostTemplate({ 
    siteMetadata,
    postRepositoryFileUrl,
    post,
    recommendedPosts
  }: PostTemplateProps) {
  const [coverIsInView, setCoverIsInView] = useState(true);
  // const post = this.props.data.markdownRemark;
  // const frontmatter = post.frontmatter;
  // const sizes = frontmatter.thumbnail.childImageSharp.sizes;
  // const title = frontmatter.title;
  // const tags = frontmatter.tags;
  // const recommendedPosts = this.props.data.recommendedPosts.edges;
  const postUrl = siteMetadata.siteUrl + TO_POST({
    slug: post.slug
  });
  return (
    <Layout>
      <article>
        {/* <MetaTags {...this.props} />
        <MetaStructuredData {...this.props} /> */}
        <Cover
          onViewChange={setCoverIsInView}
          className={styles.postCover}
          thumbnail={post.thumbnail}
        />
        <h1>{post.title}</h1>
        <Subheader tags={post.tags} publishedDate={post.publishedDate} />
        <ShareGroupVertical
          url={postUrl}
          text={post.title}
          tags={post.tags}
          className={coverIsInView ? styles.hidePostCover : ''}
        />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <Edit url={postRepositoryFileUrl} />
        <ShareBottom
          url={postUrl}
          text={post.title}
          tags={post.tags}
        />
        <RecommendedList posts={recommendedPosts} />
      </article>
    </Layout>
  );
}