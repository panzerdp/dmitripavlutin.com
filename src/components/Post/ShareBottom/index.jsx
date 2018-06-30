import React from 'react';
import PropTypes from 'prop-types';

import ShareGroupHorizontal from 'components/Share/Group/Horizontal';
import styles from './index.module.scss';

export default function PostShareBottom({ url, text, tags }) {
  return (
    <div className={styles.postShareBottom}>
      <h3>
        Like the post? Share it!
      </h3>
      <p>
        <i>Writing a quality post requires a lot of time and effort. I appreciate if you&#x27;d share it!</i>
      </p>
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