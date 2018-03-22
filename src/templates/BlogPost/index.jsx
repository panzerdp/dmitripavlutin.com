import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import R from 'ramda';
import Img from "gatsby-image";

import 'prismjs/themes/prism.css';
import styles from './index.module.scss';
import Subheader from 'components/Subheader';

const getTitle = R.path(['data', 'site', 'siteMetadata', 'title']);

export default function BlogPostTemplate(props) {
  const post = props.data.markdownRemark;
  const siteTitle = getTitle(this.props);
  const sizes = post.frontmatter.thumbnail.childImageSharp.sizes;
  return (
    <article>
      <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
      <div className={styles.postCover}>
        <Img sizes={sizes} />
      </div>
      <h1>{post.frontmatter.title}</h1>
      <Subheader node={post} />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}

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
