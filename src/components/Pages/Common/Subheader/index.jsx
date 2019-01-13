import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import styles from './index.module.scss';
import Tag from '@common/Tag';

const mapTags = R.map(function mapTag(tagName) {
  return <Tag name={tagName} key={tagName} />;
});

export default function Subheader({ tags, publishedDate }) {
  return (
    <div className={styles.subheader}>
      <div className={styles.tags}>{mapTags(tags)}</div>
      <small>{publishedDate}</small>
    </div>
  );
}

Subheader.propTypes = {
  tags: PropTypes.array,
  publishedDate: PropTypes.string
};