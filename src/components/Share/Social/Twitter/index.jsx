import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ShareButton from 'components/Share/Button';
import styles from './index.module.scss';
import withWindowOpen from 'components/With/WindowOpen';

export class ShareSocialTwitter extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return <ShareButton title="Share on Twitter" onClick={this.handleClick} className={styles.twitter} />;
  }

  handleClick() {
  }
}

ShareSocialTwitter.propTypes = {
  url: PropTypes.string
};

export default withWindowOpen(ShareSocialTwitter);