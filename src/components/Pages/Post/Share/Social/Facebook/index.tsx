

import withWindowOpen, { WindowOpenOptions } from 'components/With/WindowOpen';
import PostShareButton from 'components/Pages/Post/Share/Button';
import * as styles from './index.module.scss';

export const URL_SHARE_FACEBOOK = 'https://www.facebook.com/sharer/sharer.php/';

interface PostShareSocialFacebookProps {
  url: string;
  windowOpen?(props: WindowOpenOptions): void;
}

export class PostShareSocialFacebook extends React.Component<PostShareSocialFacebookProps> {
  public render() {
    return (
      <PostShareButton
        title="Share on Facebook"
        href={this.getFacebookShareUrl()}
        onClick={this.handleClick}
        className={styles.facebook}
      />
    );
  }

  public handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.props.windowOpen({
      url: this.getFacebookShareUrl(),
      width: 550,
      height: 296,
      name: 'Facebook share',
    });
  };

  public getFacebookShareUrl() {
    const { url } = this.props;
    return `${URL_SHARE_FACEBOOK}?u=${encodeURIComponent(url)}`;
  }
}

export default withWindowOpen(PostShareSocialFacebook);
