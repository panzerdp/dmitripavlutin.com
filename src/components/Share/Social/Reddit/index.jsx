import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'query-string';

import ShareButton from 'components/Share/Button';
import styles from './index.module.scss';
import withWindowOpen from 'components/With/WindowOpen';

const SHARE_REDDIT = 'https://www.reddit.com/submit';

export class ShareSocialFacebook extends Component {
  render() {
    return <ShareButton title="Submit to Reddit" onClick={this.handleClick} className={styles.reddit} />;
  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.windowOpen({
      url: this.getRedditShareUrl(),
      width: 550,
      height: 296,
      name: 'Reddit submit'
    });
  }

  getRedditShareUrl() {
    const { url } = this.props;
    return SHARE_REDDIT + '?' + stringify({
      url
    });
  }
}

ShareSocialFacebook.propTypes = {
  url: PropTypes.string,
  windowOpen: PropTypes.func
};

export default withWindowOpen(ShareSocialFacebook);