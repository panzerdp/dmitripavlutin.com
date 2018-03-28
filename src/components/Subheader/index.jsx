import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import styles from './index.module.scss';
import Tag from 'components/Tag';

const mapTags = R.addIndex(R.map)(function mapTag(tagName, index) {
  return <Tag name={tagName} key={index} />;
});

export default function Subheader({ post }) {
  return (
    <div className={styles.subheader}>
      <div className={styles.tags}>{mapTags(post.frontmatter.tags)}</div>
      <small>{post.frontmatter.publishedDate}</small>
    </div>
  );
}

Subheader.propTypes = {
  post: PropTypes.object
};