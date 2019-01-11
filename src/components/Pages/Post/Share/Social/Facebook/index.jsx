import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'query-string';

import ShareButton from '../../Button';
import styles from './index.module.scss';
import withWindowOpen from 'components/With/WindowOpen';

const SHARE_FACEBOOK = 'https://www.facebook.com/sharer/sharer.php/';

export class ShareSocialFacebook extends Component {
  render() {
    return <ShareButton title="Share on Twitter" onClick={this.handleClick} className={styles.facebook} />;
  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.windowOpen({
      url: this.getFacebookShareUrl(),
      width: 550,
      height: 296,
      name: 'Facebook share'
    });
  }

  getFacebookShareUrl() {
    const { url } = this.props;
    return SHARE_FACEBOOK + '?' + stringify({
      u: url
    });
  }
}

ShareSocialFacebook.propTypes = {
  url: PropTypes.string,
  windowOpen: PropTypes.func
};

export default withWindowOpen(ShareSocialFacebook);