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

export default class BlogPostTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coverIsInView: true
    };
    this.handleCoverViewChange = this.handleCoverViewChange.bind(this);
  }

  render() {
    const post = this.props.data.markdownRemark;
    const sizes = post.frontmatter.thumbnail.childImageSharp.sizes;
    const siteUrl = this.props.data.site.siteMetadata.siteUrl;
    return (
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
          url={siteUrl}
          className={this.state.coverIsInView ? styles.hidePostCover : ''}
        />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    );
  }

  handleCoverViewChange(coverIsInView) {
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
