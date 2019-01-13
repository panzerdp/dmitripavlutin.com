import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';
import SimplePost from '@common/Simple/Post';

export default class SimpleList extends Component {
  render() {
    const { edges } = this.props;
    return (
      <div className={styles.simpleList}>
        {edges.map(this.mapPost)}
      </div>
    );
  }

  mapPost({ node: { frontmatter: { slug, title, description, tags, publishedDate } } }, index) {
    return (
      <SimplePost
        slug={slug}
        title={title}
        description={description}
        tags={tags}
        publishedDate={publishedDate}
        key={index}
      />
    );
  }
}

SimpleList.propTypes = {
  edges: PropTypes.array
};