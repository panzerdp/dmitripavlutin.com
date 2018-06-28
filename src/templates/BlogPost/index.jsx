import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'prismjs/themes/prism.css';
import 'intersection-observer';

import styles from './index.module.scss';
import Subheader from 'components/Subheader';
import PostMetaTags from 'components/Post/MetaTags';
import PostMetaStructuredData from 'components/Post/MetaStructuredData';
import ShareGroupVertical from 'components/Share/Group/Vertical';
import PostCover from 'components/Post/Cover';
import PostEdit from 'components/Post/Edit';
import { TO_POST } from 'routes/path';
import { postRelativePath } from './util';
import Layout from 'components/Layout';

export default class BlogPostTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coverIsInView: true
    };
  }

  render() {
    const post = this.props.data.markdownRemark;
    const siteMetadata = this.props.data.site.siteMetadata;
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

  handleCoverViewChange = (coverIsInView) => {
    this.setState({
      coverIsInView
    });
  }
}

BlogPostTemplate.propTypes = {
  data: PropTypes.object
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        repositoryUrl
        profiles {
          stackoverflow
          twitter
          linkedin
          github
          facebook
          googlePlus
        }
        nicknames {
          twitter
        }
      }
    }
    authorProfilePicture: file(relativePath: { eq: "layouts/profile-picture.jpg" }) {
      childImageSharp {
        resize(width: 256, height: 256, quality: 100) {
          src
        }
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      fileAbsolutePath
      frontmatter {
        title
        description
        slug
        publishedDate: published(formatString: "MMMM DD, YYYY")
        published(formatString: "YYYY-MM-DDTHH:mm:ssZ")
        modified(formatString: "YYYY-MM-DDTHH:mm:ssZ")
        tags
        thumbnail {
          childImageSharp {
            sizes(maxWidth: 720, maxHeight: 400, quality: 90) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
