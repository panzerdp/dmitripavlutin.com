import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';
import withWindowOpen from 'components/With/WindowOpen';

export class ShareButtonFacebook extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return <a title="Share on Facebook" onClick={this.handleClick} className={styles.share} />;
  }

  handleClick() {
  }
}

ShareButtonFacebook.propTypes = {
  url: PropTypes.string
};

export default withWindowOpen(ShareButtonFacebook);