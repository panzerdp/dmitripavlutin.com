import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';
import Tag from 'components/Pages/Common/Tag';

export default function Subheader({ tags, publishedDate }) {
  return (
    <div className={styles.subheader}>
      <div className={styles.tags}>{tags.map(mapTag)}</div>
      <small>{publishedDate}</small>
    </div>
  );
}

function mapTag(tagName) {
  return <Tag name={tagName} key={tagName} />;
}

Subheader.propTypes = {
  tags: PropTypes.array,
  publishedDate: PropTypes.string
};