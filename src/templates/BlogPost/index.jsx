import React, { Component } from 'react';
import Img from "gatsby-image";
import PropTypes from 'prop-types';
import Observer from 'react-intersection-observer'

import 'prismjs/themes/prism.css';
import 'intersection-observer';

import styles from './index.module.scss';
import Subheader from 'components/Subheader';
import PostMetaTags from 'components/Post/MetaTags';
import PostMetaStructuredData from 'components/Post/MetaStructuredData';
import ShareGroupVertical from 'components/Share/Group/Vertical';

export default function BlogPostTemplate(props) {
  const post = props.data.markdownRemark;
  const sizes = post.frontmatter.thumbnail.childImageSharp.sizes;
  return (
    <article>
      <PostMetaTags {...props} />
      <PostMetaStructuredData {...props} />
      <div className={styles.postCover}>
        <Img sizes={sizes} />
      </div>
      <h1>{post.frontmatter.title}</h1>
      <Subheader post={post} />
      <ShareGroupVertical url={props.data.site.siteMetadata.siteUrl} />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
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
