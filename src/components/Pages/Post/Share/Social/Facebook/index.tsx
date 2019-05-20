import { stringify } from 'query-string';
import React, { Component } from 'react';

import withWindowOpen from 'components/With/WindowOpen';
import ShareButton from '../../Button';
import styles from './index.module.scss';

const SHARE_FACEBOOK = 'https://www.facebook.com/sharer/sharer.php/';

interface ShareSocialFacebookProps {
  url: string;
  windowOpen(props: any): void;
}

export class ShareSocialFacebook extends Component<ShareSocialFacebookProps> {
  public render() {
    return <ShareButton title="Share on Twitter" onClick={this.handleClick} className={styles.facebook} />;
  }

  public handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.props.windowOpen({
      url: this.getFacebookShareUrl(),
      width: 550,
      height: 296,
      name: 'Facebook share',
    });
  }

  public getFacebookShareUrl() {
    const { url } = this.props;
    return (
      SHARE_FACEBOOK +
      '?' +
      stringify({
        u: url,
      })
    );
  }
}

export default withWindowOpen(ShareSocialFacebook);
