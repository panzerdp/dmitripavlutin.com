import * as React from 'react';

import withWindowOpen from 'components/With/WindowOpen';
import { slugify } from 'utils/string';
import ShareButton from '../../Button';
import styles from './index.module.scss';

export const URL_SHARE_TWITTER = 'https://twitter.com/share';

interface PostShareSocialTwitterProps {
  url: string;
  text: string;
  tags: Tags;
  windowOpen(props: any): void;
}

export class PostShareSocialTwitter extends React.Component<PostShareSocialTwitterProps> {
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
      URL_SHARE_TWITTER +
      `?url=${encodeURIComponent(url)}` +
      `&text=${encodeURIComponent(text)}` +
      `&hashtags=${encodeURIComponent(tags.map((tag) => slugify(tag)).join(','))}`
    );
  }
}

export default withWindowOpen(PostShareSocialTwitter);
