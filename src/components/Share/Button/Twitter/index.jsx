import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';
import withWindowOpen from 'components/With/WindowOpen';

export class ShareButtonTwitter extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return <a title="Share on Twitter" onClick={this.handleClick} className={styles.share} />;
  }

  handleClick() {
  }
}

ShareButtonTwitter.propTypes = {
  url: PropTypes.string
};

export default withWindowOpen(ShareButtonTwitter);