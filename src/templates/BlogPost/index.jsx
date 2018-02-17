import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';
import Img from "gatsby-image";

import 'prismjs/themes/prism.css';
import styles from './index.module.scss';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const { previous, next } = this.props.pathContext;
    const sizes = post.frontmatter.thumbnail.childImageSharp.sizes;
    return (
      <article>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <div className={styles.postCover}>
          <Img sizes={sizes} />
        </div>
        <h1>{post.frontmatter.title}</h1>
        <div className={styles.date}>{post.frontmatter.date}</div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        thumbnail {
          childImageSharp {
            sizes(maxWidth: 1080, maxHeight: 405, quality: 90) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
