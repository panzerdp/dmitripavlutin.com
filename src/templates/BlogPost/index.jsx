import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import R from 'ramda';
import Img from "gatsby-image";

import 'prismjs/themes/prism.css';
import styles from './index.module.scss';

const getTitle = R.path(['data', 'site', 'siteMetadata', 'title']);

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = getTitle(this.props);
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
            sizes(maxWidth: 720, maxHeight: 400, quality: 90) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
