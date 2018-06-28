import React, { Component } from 'react';
import { StaticQuery } from "gatsby";

import 'prismjs/themes/prism.css';
import 'intersection-observer';

import styles from './index.module.scss';

import Layout from 'components/Layout';
import Subheader from 'components/Subheader';
import PostMetaTags from 'components/Post/MetaTags';
import PostMetaStructuredData from 'components/Post/MetaStructuredData';
import ShareGroupVertical from 'components/Share/Group/Vertical';
import PostCover from 'components/Post/Cover';
import PostEdit from 'components/Post/Edit';
import { TO_POST } from 'routes/path';
import { postRelativePath } from './util';
import query from './query';

export default class BlogPostTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coverIsInView: true
    };
  }

  render() {
    return (
      <StaticQuery
        query={query}
        render={this.renderContent}
      />
    );
  }

  handleCoverViewChange = (coverIsInView) => {
    this.setState({
      coverIsInView
    });
  }

  renderContent = (data) => {
    const post = data.markdownRemark;
    const siteMetadata = data.site.siteMetadata;
    const frontmatter = post.frontmatter;
    const sizes = frontmatter.thumbnail.childImageSharp.sizes;
    const title = frontmatter.title;
    const tags = frontmatter.tags;
    const postUrl = siteMetadata.siteUrl + TO_POST({
      slug: frontmatter.slug
    });
    const postRepositoryFileUrl = siteMetadata.repositoryUrl + '/tree/master/' + postRelativePath(post.fileAbsolutePath);
    return (
      <Layout>
        <article>
          <PostMetaTags {...this.props} />
          <PostMetaStructuredData {...this.props} />
          <PostCover
            onViewChange={this.handleCoverViewChange}
            className={styles.postCover}
            sizes={sizes}
          />
          <h1>{post.frontmatter.title}</h1>
          <Subheader tags={post.frontmatter.tags} publishedDate={post.frontmatter.publishedDate} />
          <ShareGroupVertical
            url={postUrl}
            text={title}
            tags={tags}
            className={this.state.coverIsInView ? styles.hidePostCover : ''}
          />
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <PostEdit url={postRepositoryFileUrl} />
        </article>
      </Layout>
    );
  }
}