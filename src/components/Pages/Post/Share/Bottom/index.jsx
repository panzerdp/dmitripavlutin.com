import React from 'react';
import PropTypes from 'prop-types';

import ShareGroupHorizontal from '../Group/Horizontal';
import styles from './index.module.scss';

export default function PostShareBottom({ url, text, tags }) {
  return (
    <div className={styles.postShareBottom}>
      <h3>
        Like the post? Share it!
      </h3>
      <ShareGroupHorizontal
        url={url}
        text={text}
        tags={tags}
      />
    </div>
  );
}

PostShareBottom.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string,
  tags: PropTypes.array
};