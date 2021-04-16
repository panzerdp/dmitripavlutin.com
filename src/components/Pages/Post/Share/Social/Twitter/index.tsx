import * as React from 'react';

import withWindowOpen, { WindowOpenOptions } from 'components/With/WindowOpen';
import { slugify } from 'utils/string';
import ShareButton from '../../Button';
import * as styles from './index.module.scss';

export const URL_SHARE_TWITTER = 'https://twitter.com/share';

interface PostShareSocialTwitterProps {
  url: string;
  text: string;
  tags: Tags;
  twitterName: string;
  windowOpen?(props: WindowOpenOptions): void;
}

export class PostShareSocialTwitter extends React.Component<PostShareSocialTwitterProps> {
  public render() {
    return (
      <ShareButton
        href={this.getTwitterShareUrl()}
        title="Share on Twitter"
        onClick={this.handleClick}
        className={styles.twitter}
      />
    );
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
    const { url, text, tags, twitterName } = this.props;
    return (
      URL_SHARE_TWITTER +
      `?url=${encodeURIComponent(url)}` +
      `&text=${encodeURIComponent(text)}` +
      `&hashtags=${encodeURIComponent(tags.map((tag) => slugify(tag)).join(','))}` +
      `&via=${twitterName}`
    );
  }
}

export default withWindowOpen(PostShareSocialTwitter);
