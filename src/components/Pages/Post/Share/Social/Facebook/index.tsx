import React, { Component } from 'react';
import { stringify } from 'query-string';

import ShareButton from '../../Button';
import styles from './index.module.scss';
import withWindowOpen from 'components/With/WindowOpen';

const SHARE_FACEBOOK = 'https://www.facebook.com/sharer/sharer.php/';

interface ShareSocialFacebookProps {
  url: string;
  windowOpen(props: any): void;
}

export class ShareSocialFacebook extends Component<ShareSocialFacebookProps> {
  render() {
    return <ShareButton title="Share on Twitter" onClick={this.handleClick} className={styles.facebook} />;
  }

  handleClick = (event: React.SyntheticEvent) => {
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

export default withWindowOpen(ShareSocialFacebook);