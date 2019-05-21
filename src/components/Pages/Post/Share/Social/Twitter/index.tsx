import * as React from 'react';
import { stringify } from 'query-string';

import withWindowOpen from 'components/With/WindowOpen';
import { slugify } from 'utils/string';
import ShareButton from '../../Button';
import styles from './index.module.scss';

const SHARE_TWITTER = 'https://twitter.com/share';

interface ShareSocialTwitterProps {
  url: string;
  text: string;
  tags: Tags;
  windowOpen(props: any): void;
}

export class ShareSocialTwitter extends React.Component<ShareSocialTwitterProps> {
  public render() {
    return <ShareButton title="Share on Twitter" onClick={this.handleClick} className={styles.twitter} />;
  }

  public handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.props.windowOpen({
      url: this.getTwitterShareUrl(),
      width: 550,
      height: 300,
      name: 'Twitter share',
    });
  };

  public getTwitterShareUrl() {
    const { url, text, tags } = this.props;
    return (
      SHARE_TWITTER +
      '?' +
      stringify({
        url,
        text,
        hashtags: tags.map((tag) => slugify(tag)),
      })
    );
  }
}

export default withWindowOpen(ShareSocialTwitter);
