import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

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
import { postRelativePath } from './util';
import Layout from 'components/Layout/Container';

export default class PostTemplate extends Component {
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
    const recommendedPosts = this.props.data.recommendedPosts.edges;
    const postUrl = siteMetadata.siteUrl + TO_POST({
      slug: frontmatter.slug
    });
    const postRepositoryFileUrl = siteMetadata.repositoryUrl + '/tree/master/' + postRelativePath(post.fileAbsolutePath);
    return (
      <Layout>
        <article>
          <MetaTags {...this.props} />
          <MetaStructuredData {...this.props} />
          <Cover
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
          <Edit url={postRepositoryFileUrl} />
          <ShareBottom
            url={postUrl}
            text={title}
            tags={tags}
          />
          <RecommendedList posts={recommendedPosts} />
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

PostTemplate.propTypes = {
  data: PropTypes.object
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $recommended: [String]!) {
    site {
      siteMetadata {
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
    authorProfilePicture: file(relativePath: { eq: "profile-picture.jpg" }) {
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
        recommended
        thumbnail {
          childImageSharp {
            sizes(maxWidth: 720, maxHeight: 350, quality: 90) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
    recommendedPosts: allMarkdownRemark(
      filter: {
        frontmatter: { 
          slug: {
            in: $recommended
          }
        }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            thumbnail {
              childImageSharp {
                sizes(maxWidth: 360, maxHeight: 175, quality: 90) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
